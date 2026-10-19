import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import type { VoiceScene, VoiceTrack, Word } from '../src/voice-types'

type Script = {
  voice: {
    voiceId: string
    modelId: string
    settings: Record<string, number | boolean>
  }
  scenes: { id: string; text: string }[]
}

type Alignment = {
  characters: string[]
  character_start_times_seconds: number[]
  character_end_times_seconds: number[]
}

const SCRIPT_PATH = 'script/scenes.json'
const TRACK_PATH = 'src/generated/voice.json'
const AUDIO_DIR = 'public/audio'

const args = process.argv.slice(2)
const estimate = args.includes('--estimate')
const onlyIndex = args.indexOf('--only')
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : undefined

const script: Script = JSON.parse(readFileSync(SCRIPT_PATH, 'utf8'))

// Keychain first so the key never has to live in a file.
const getKey = (): string => {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY
  return execFileSync(
    'security',
    ['find-generic-password', '-s', 'elevenlabs', '-w'],
    { encoding: 'utf8' },
  ).trim()
}

const isAlignment = (value: unknown): value is Alignment =>
  typeof value === 'object' &&
  value !== null &&
  'characters' in value &&
  'character_start_times_seconds' in value &&
  'character_end_times_seconds' in value

const parseResponse = (
  body: unknown,
): { audio: string; alignment: Alignment } => {
  if (
    typeof body === 'object' &&
    body !== null &&
    'audio_base64' in body &&
    typeof body.audio_base64 === 'string' &&
    'alignment' in body &&
    isAlignment(body.alignment)
  ) {
    return { audio: body.audio_base64, alignment: body.alignment }
  }
  throw new Error(`Unexpected ElevenLabs response: ${JSON.stringify(body)}`)
}

const toWords = (a: Alignment): Word[] => {
  const words: Word[] = []
  let text = ''
  let start = 0
  let end = 0
  a.characters.forEach((char, i) => {
    if (/\s/.test(char)) {
      if (text) words.push({ text, start, end })
      text = ''
      return
    }
    if (!text) start = a.character_start_times_seconds[i]
    text += char
    end = a.character_end_times_seconds[i]
  })
  if (text) words.push({ text, start, end })
  return words
}

// Rough narration pace so the studio works before any audio exists.
const estimateWords = (text: string): Word[] => {
  let t = 0
  return text.split(/\s+/).map(word => {
    const start = t
    const end = start + 0.12 + word.length * 0.055
    t = end + (/[.?!]$/.test(word) ? 0.35 : /,$/.test(word) ? 0.18 : 0.04)
    return { text: word, start, end }
  })
}

const synthesize = async (
  index: number,
  key: string,
): Promise<VoiceScene> => {
  const scene = script.scenes[index]
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${script.voice.voiceId}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: scene.text,
        model_id: script.voice.modelId,
        voice_settings: script.voice.settings,
        // Neighbouring text keeps intonation continuous across scene cuts.
        previous_text: script.scenes[index - 1]?.text,
        next_text: script.scenes[index + 1]?.text,
      }),
    },
  )
  if (!res.ok) {
    throw new Error(`ElevenLabs ${res.status} on "${scene.id}": ${await res.text()}`)
  }
  const { audio, alignment } = parseResponse(await res.json())
  const file = `audio/${scene.id}.mp3`
  writeFileSync(`public/${file}`, Buffer.from(audio, 'base64'))
  const words = toWords(alignment)
  return {
    id: scene.id,
    audio: file,
    duration: words[words.length - 1]?.end ?? 0,
    words,
  }
}

const main = async () => {
  mkdirSync(AUDIO_DIR, { recursive: true })
  mkdirSync('src/generated', { recursive: true })

  const previous: VoiceTrack = existsSync(TRACK_PATH)
    ? JSON.parse(readFileSync(TRACK_PATH, 'utf8'))
    : { scenes: [] }
  const key = estimate ? '' : getKey()

  const scenes: VoiceScene[] = []
  for (const [i, scene] of script.scenes.entries()) {
    const kept = previous.scenes.find(s => s.id === scene.id)
    if (only && only !== scene.id && kept) {
      scenes.push(kept)
      continue
    }
    if (estimate) {
      const words = estimateWords(scene.text)
      scenes.push({
        id: scene.id,
        audio: null,
        duration: words[words.length - 1].end,
        words,
      })
      continue
    }
    console.log(`voice: ${scene.id}`)
    scenes.push(await synthesize(i, key))
  }

  writeFileSync(TRACK_PATH, `${JSON.stringify({ scenes }, null, 2)}\n`)
  const total = scenes.reduce((sum, s) => sum + s.duration, 0)
  console.log(`done: ${scenes.length} scenes, ${total.toFixed(1)}s of speech`)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
