import { Fragment } from 'react'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

type FlowNode = { tool: string; step: string; glyph: string }

const Node = ({ node, at, last }: { node: FlowNode; at: number; last: boolean }) => {
  const p = useAppear(at)
  return (
    <Card appear={p} highlight={last ? colors.accent : undefined} style={{ padding: '18px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: colors.surfaceHigh,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 34,
            color: colors.accent,
            fontFamily: fonts.mono,
            fontWeight: 700,
          }}
        >
          {node.glyph}
        </div>
        <div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontWeight: 800,
              fontSize: 44,
              color: colors.text,
            }}
          >
            {node.tool}
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.muted }}>
            {node.step}
          </div>
        </div>
      </div>
    </Card>
  )
}

const Arrow = ({ at }: { at: number }) => {
  const p = useAppear(at, 24)
  return (
    <div
      style={{
        width: 4,
        height: 20 * p,
        marginLeft: 58,
        background: colors.accent,
        borderRadius: 2,
      }}
    />
  )
}

export const FlowDiagram = ({ nodes, at }: { nodes: FlowNode[]; at: number[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {nodes.map((node, i) => (
      <Fragment key={node.tool}>
        {i > 0 && <Arrow at={at[i] - 0.15} />}
        <Node node={node} at={at[i]} last={i === nodes.length - 1} />
      </Fragment>
    ))}
  </div>
)
