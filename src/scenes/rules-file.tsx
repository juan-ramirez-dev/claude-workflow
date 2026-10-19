import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

const Rule = ({ text, at }: { text: string; at: number }) => {
  const p = useAppear(at)
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        fontFamily: fonts.mono,
        fontSize: 40,
        color: colors.text,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)`,
      }}
    >
      <span style={{ color: colors.danger, fontWeight: 700 }}>✗</span>
      <span>{text}</span>
    </div>
  )
}

export const RulesFile = ({
  filename,
  rules,
  at,
}: {
  filename: string
  rules: string[]
  at: number[]
}) => {
  const file = useAppear(at[0])
  return (
    <Card appear={file} style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px 32px',
          background: colors.surfaceHigh,
          fontFamily: fonts.mono,
          fontSize: 30,
          color: colors.accent,
          borderBottom: `2px solid ${colors.border}`,
        }}
      >
        {filename}
      </div>
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {rules.map((rule, i) => (
          <Rule key={rule} text={rule} at={at[i + 1]} />
        ))}
      </div>
    </Card>
  )
}
