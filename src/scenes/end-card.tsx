import { interpolate } from 'remotion'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

export const EndCard = ({
  name,
  role,
  cta,
  at,
}: {
  name: string
  role: string
  cta: string
  at: number[]
}) => {
  const [startAt, systemAt, nameAt, ctaAt] = at
  const line1 = useAppear(startAt)
  const line2 = useAppear(systemAt, 12)
  const who = useAppear(nameAt)
  const follow = useAppear(ctaAt, 10)
  const title = { fontFamily: fonts.sans, fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <div>
        <div style={{ ...title, color: colors.muted, opacity: line1 }}>
          AI doesn&apos;t make you a better engineer.
        </div>
        <div
          style={{
            ...title,
            color: colors.accent,
            opacity: line2,
            transform: `scale(${interpolate(line2, [0, 1], [0.9, 1])})`,
            transformOrigin: 'left center',
          }}
        >
          Your system does.
        </div>
      </div>
      <div style={{ opacity: who, transform: `translateY(${interpolate(who, [0, 1], [30, 0])}px)` }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 800, fontSize: 64, color: colors.text }}>
          {name}
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 30, color: colors.muted }}>{role}</div>
      </div>
      <div
        style={{
          alignSelf: 'flex-start',
          fontFamily: fonts.sans,
          fontWeight: 800,
          fontSize: 40,
          color: colors.bg,
          background: colors.accent,
          borderRadius: 999,
          padding: '20px 44px',
          opacity: follow,
          transform: `scale(${interpolate(follow, [0, 1], [0.6, 1])})`,
        }}
      >
        {cta}
      </div>
    </div>
  )
}
