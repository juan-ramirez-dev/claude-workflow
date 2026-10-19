import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

const Check = ({ label, on, appear }: { label: string; on: number; appear: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      opacity: appear,
      fontFamily: fonts.mono,
      fontSize: 30,
      color: on > 0.5 ? colors.text : colors.muted,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `3px solid ${on > 0.5 ? colors.success : colors.border}`,
        color: colors.success,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
      }}
    >
      {on > 0.5 ? '✓' : ''}
    </div>
    {label}
  </div>
)

const Chip = ({ label, appear }: { label: string; appear: number }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontWeight: 700,
      fontSize: 30,
      color: colors.success,
      border: `2px solid ${colors.success}`,
      borderRadius: 999,
      padding: '10px 26px',
      opacity: appear,
      transform: `scale(${interpolate(appear, [0, 1], [0.7, 1])})`,
    }}
  >
    {label} ✓
  </div>
)

const Reviewer = ({
  name,
  appear,
  refuter,
}: {
  name: string
  appear: number
  refuter: boolean
}) => (
  <div
    style={{
      flex: 1,
      padding: '20px 10px',
      borderRadius: 16,
      textAlign: 'center',
      background: refuter ? colors.accent : colors.surfaceHigh,
      color: refuter ? colors.bg : colors.text,
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: 700,
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [30, 0])}px)`,
    }}
  >
    {name}
  </div>
)

export const TestReview = ({
  cases,
  picked,
  reviewers,
  at,
}: {
  cases: string[]
  picked: number[]
  reviewers: string[]
  at: number[]
}) => {
  const [proposeAt, pickAt, jestAt, cypressAt, fourAt, fifthAt, wrongAt] = at
  const list = useAppear(proposeAt)
  const pick = useAppear(pickAt)
  const jest = useAppear(jestAt)
  const cypress = useAppear(cypressAt)
  const four = useAppear(fourAt)
  const fifth = useAppear(fifthAt)
  const strike = useAppear(wrongAt, 20)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Card appear={list}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {cases.map((c, i) => (
            <Check key={c} label={c} appear={list} on={picked.includes(i) ? pick : 0} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 26 }}>
          <Chip label="Jest" appear={jest} />
          <Chip label="Cypress" appear={cypress} />
        </div>
      </Card>
      <Card appear={four}>
        <div style={{ display: 'flex', gap: 12 }}>
          {reviewers.map((r, i) => (
            <Reviewer
              key={r}
              name={r}
              refuter={i === reviewers.length - 1}
              appear={i === reviewers.length - 1 ? fifth : four}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: fonts.mono,
            fontSize: 26,
            color: colors.muted,
            opacity: fifth,
          }}
        >
          <span
            style={{
              textDecoration: strike > 0.5 ? 'line-through' : 'none',
              textDecorationColor: colors.danger,
              textDecorationThickness: 4,
            }}
          >
            finding #3: false positive
          </span>
          <span style={{ color: colors.danger, opacity: strike }}> ✗ refuted</span>
        </div>
      </Card>
    </div>
  )
}
