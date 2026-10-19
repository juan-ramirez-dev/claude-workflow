import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

const Option = ({
  label,
  appear,
  picked,
}: {
  label: string
  appear: number
  picked: number
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '20px 26px',
      borderRadius: 16,
      border: `2px solid ${picked > 0.5 ? colors.accent : colors.border}`,
      background: picked > 0.5 ? colors.surfaceHigh : 'transparent',
      opacity: appear,
      transform: `translateX(${interpolate(appear, [0, 1], [30, 0])}px)`,
      fontFamily: fonts.sans,
      fontSize: 36,
      color: colors.text,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        border: `3px solid ${picked > 0.5 ? colors.accent : colors.muted}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 16 * picked,
          height: 16 * picked,
          borderRadius: 8,
          background: colors.accent,
        }}
      />
    </div>
    {label}
  </div>
)

export const QuestionCard = ({
  question,
  options,
  pick,
  at,
}: {
  question: string
  options: string[]
  pick: number
  at: number[]
}) => {
  const [planAt, questionAt, chooseAt, codeAt] = at
  const plan = useAppear(planAt)
  const card = useAppear(questionAt)
  const picked = useAppear(chooseAt, 12)
  const code = useAppear(codeAt)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Card appear={plan}>
        <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.muted }}>
          plan.md · what · why · how · files · questions · tests
        </div>
      </Card>
      <Card appear={card} highlight={colors.accent}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 800,
            fontSize: 44,
            color: colors.text,
            marginBottom: 24,
          }}
        >
          {question}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {options.map((option, i) => (
            <Option
              key={option}
              label={option}
              appear={card}
              picked={i === pick ? picked : 0}
            />
          ))}
        </div>
      </Card>
      <div
        style={{
          alignSelf: 'flex-start',
          fontFamily: fonts.mono,
          fontSize: 32,
          fontWeight: 700,
          color: colors.bg,
          background: colors.success,
          borderRadius: 999,
          padding: '14px 30px',
          opacity: code,
          transform: `scale(${interpolate(code, [0, 1], [0.8, 1])})`,
        }}
      >
        → writing code
      </div>
    </div>
  )
}
