import { interpolate } from 'remotion'
import { colors, fonts } from '../theme'
import { useAppear, useSeconds } from '../timing'

const COLUMNS = 5
// Odd rows and columns keep the template tile in the exact center.
const ROWS = 3

export const RepoGrid = ({ at }: { at: number[] }) => {
  const t = useSeconds()
  const [everyAt, templateAt] = at
  const template = useAppear(templateAt)
  const center = Math.floor((COLUMNS * ROWS) / 2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gap: 20,
        }}
      >
        {Array.from({ length: COLUMNS * ROWS }, (_, i) => {
          // Light up outward from the template tile.
          const distance = Math.abs((i % COLUMNS) - (center % COLUMNS)) + Math.abs(Math.floor(i / COLUMNS) - Math.floor(center / COLUMNS))
          const on = interpolate(t, [everyAt + distance * 0.12, everyAt + distance * 0.12 + 0.3], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          const isTemplate = i === center
          return (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 18,
                border: `2px solid ${on > 0.5 ? colors.accent : colors.border}`,
                background: isTemplate && template > 0.5 ? colors.accent : colors.surface,
                boxShadow: on > 0.5 ? `0 0 28px ${colors.glow}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.mono,
                fontSize: 30,
                color: isTemplate && template > 0.5 ? colors.bg : colors.accent,
                opacity: interpolate(on, [0, 1], [0.4, 1]),
              }}
            >
              {on > 0.5 ? '✓' : ''}
            </div>
          )
        })}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 800,
          fontSize: 60,
          color: colors.text,
          opacity: template,
        }}
      >
        template <span style={{ color: colors.accent }}>→</span> day one
      </div>
    </div>
  )
}
