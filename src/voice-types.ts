export type Word = { text: string; start: number; end: number }

export type VoiceScene = {
  id: string
  // null = estimated timing, no audio generated yet.
  audio: string | null
  duration: number
  words: Word[]
}

export type VoiceTrack = { scenes: VoiceScene[] }
