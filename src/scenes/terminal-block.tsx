import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

type Entry = { command: string; verdict: 'BLOCKED' | 'HARD BLOCK' | 'FIXED'; note: string }

const Line = ({ entry, at }: { entry: Entry; at: number }) => {
  const typed = useAppear(at - 0.35, 30)
  const result = useAppear(at)
  const shown = Math.round(entry.command.length * typed)
  const tone = entry.verdict === 'FIXED' ? colors.success : colors.danger
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: typed > 0.01 ? 1 : 0 }}>
      <div style={{ color: colors.text }}>
        <span style={{ color: colors.muted }}>$ </span>
        {entry.command.slice(0, shown)}
      </div>
      <div
        style={{
          opacity: result,
          transform: `translateY(${interpolate(result, [0, 1], [10, 0])}px)`,
          color: colors.muted,
        }}
      >
        <span style={{ color: tone, fontWeight: 700 }}>{entry.verdict}</span>
        {`  ${entry.note}`}
      </div>
    </div>
  )
}

export const TerminalBlock = ({ entries, at }: { entries: Entry[]; at: number[] }) => {
  const open = useAppear(at[0])
  return (
    <Card appear={open} style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '20px 28px',
          background: colors.surfaceHigh,
          borderBottom: `2px solid ${colors.border}`,
        }}
      >
        {[colors.danger, colors.accent, colors.success].map(c => (
          <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />
        ))}
        <span style={{ marginLeft: 16, fontFamily: fonts.mono, fontSize: 24, color: colors.muted }}>
          PreToolUse hook
        </span>
      </div>
      <div
        style={{
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          fontFamily: fonts.mono,
          fontSize: 30,
        }}
      >
        {entries.map((entry, i) => (
          <Line key={entry.command} entry={entry} at={at[i + 1]} />
        ))}
      </div>
    </Card>
  )
}
