import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../theme'

export const Backdrop = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  // Slow drift keeps static moments from looking frozen.
  const drift = interpolate(frame, [0, durationInFrames], [0, 120])
  const progress = frame / durationInFrames

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.surface} 2px, transparent 2px), linear-gradient(90deg, ${colors.surface} 2px, transparent 2px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `0 ${drift}px`,
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colors.glow}, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 8,
          width: `${progress * 100}%`,
          background: colors.accent,
        }}
      />
    </AbsoluteFill>
  )
}
