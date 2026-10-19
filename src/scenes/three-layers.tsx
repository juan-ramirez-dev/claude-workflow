import { interpolate } from 'remotion'
import { Card } from '../components/stage'
import { colors, fonts } from '../theme'
import { useAppear } from '../timing'

type Layer = { when: string; what: string }

const LayerRow = ({ layer, index, at }: { layer: Layer; index: number; at: number }) => {
  const p = useAppear(at)
  return (
    <Card appear={p} highlight={colors.accent} style={{ marginLeft: index * 36 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 30, color: colors.accent }}>
          {`0${index + 1}`}
        </span>
        <div>
          <div style={{ fontFamily: fonts.sans, fontWeight: 800, fontSize: 52, color: colors.text }}>
            {layer.when}
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.muted }}>
            {layer.what}
          </div>
        </div>
      </div>
    </Card>
  )
}

export const ThreeLayers = ({
  layers,
  platforms,
  at,
}: {
  layers: Layer[]
  platforms: string[]
  at: number[]
}) => {
  const launch = useAppear(at[layers.length])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {layers.map((layer, i) => (
        <LayerRow key={layer.when} layer={layer} index={i} at={at[i]} />
      ))}
      <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
        {platforms.map(p => (
          <div
            key={p}
            style={{
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 30,
              color: colors.bg,
              background: colors.success,
              borderRadius: 999,
              padding: '12px 28px',
              opacity: launch,
              transform: `scale(${interpolate(launch, [0, 1], [0.7, 1])})`,
            }}
          >
            {p} launches ✓
          </div>
        ))}
      </div>
    </div>
  )
}
