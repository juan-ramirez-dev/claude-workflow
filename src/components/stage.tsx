import type { ReactNode } from 'react'
import { AbsoluteFill, interpolate } from 'remotion'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

// Upper area of the frame; the bottom third is reserved for captions.
export const Stage = ({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) => {
  const enter = useAppear(0)
  return (
    <AbsoluteFill style={{ padding: '96px 72px 400px' }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 26,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: colors.muted,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [12, 0])}px)`,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  )
}

export const Card = ({
  children,
  appear,
  highlight,
  style,
}: {
  children: ReactNode
  appear: number
  highlight?: string
  style?: React.CSSProperties
}) => (
  <div
    style={{
      background: colors.surface,
      border: `2px solid ${highlight ?? colors.border}`,
      borderRadius: 24,
      padding: '24px 32px',
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px) scale(${interpolate(appear, [0, 1], [0.96, 1])})`,
      boxShadow: highlight ? `0 0 48px ${colors.glow}` : 'none',
      ...style,
    }}
  >
    {children}
  </div>
)
