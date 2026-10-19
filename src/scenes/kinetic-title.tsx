import { interpolate } from 'remotion'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

const Line = ({ text, at, accent }: { text: string; at: number; accent: boolean }) => {
  const p = useAppear(at, 14)
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 800,
        fontSize: 104,
        lineHeight: 1.05,
        letterSpacing: -3,
        color: accent ? colors.accent : colors.text,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px)`,
        filter: `blur(${interpolate(p, [0, 1], [12, 0])}px)`,
      }}
    >
      {text}
    </div>
  )
}

export const KineticTitle = ({
  lines,
  at,
  accentFrom,
}: {
  lines: string[]
  at: number[]
  accentFrom: number
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {lines.map((line, i) => (
      <Line key={line} text={line} at={at[i]} accent={i >= accentFrom} />
    ))}
  </div>
)
