import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import track from './generated/voice.json'
import { video } from './theme'
import type { VoiceTrack, Word } from './voice-types'

export const voice: VoiceTrack = track

export const sceneFrames = (duration: number): number =>
  Math.ceil((duration + video.tailSeconds) * video.fps) + video.transitionFrames

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

// Cues are searched in order, so a repeated word maps to its next occurrence.
// A cue that no longer exists in the script falls back to an even spread.
export const resolveCues = (
  words: Word[],
  cues: string[],
  duration: number,
): number[] => {
  let from = 0
  return cues.map((cue, i) => {
    const target = normalize(cue)
    const index = words.findIndex(
      (w, j) => j >= from && normalize(w.text).startsWith(target),
    )
    if (index === -1) return (duration * i) / Math.max(cues.length, 1)
    from = index + 1
    return words[index].start
  })
}

export const useSeconds = (): number => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return frame / fps
}

// 0 → 1 spring that starts at `at` seconds.
export const useAppear = (at: number, damping = 16): number => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return spring({
    frame: frame - Math.round(at * fps),
    fps,
    config: { damping, mass: 0.6 },
  })
}
