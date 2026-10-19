import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear, useSeconds } from '../timing'

export const SpeedCounter = ({ at }: { at: number[] }) => {
  const t = useSeconds()
  const [start, goal, works] = at
  const count = Math.round(
    interpolate(t, [start, goal], [0, 12480], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  )
  const strike = useAppear(goal, 20)
  const reveal = useAppear(works)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      <div style={{ opacity: interpolate(strike, [0, 1], [1, 0.35]) }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 30,
            color: colors.muted,
            marginBottom: 12,
          }}
        >
          lines generated
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 168,
              color: colors.text,
            }}
          >
            {count.toLocaleString('en-US')}
          </span>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '52%',
              height: 12,
              width: `${strike * 100}%`,
              background: colors.danger,
              borderRadius: 6,
            }}
          />
        </div>
      </div>
      <Card appear={reveal} highlight={colors.success}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 800,
            fontSize: 72,
            color: colors.success,
          }}
        >
          ✓ Software that works.
        </div>
      </Card>
    </div>
  )
}
