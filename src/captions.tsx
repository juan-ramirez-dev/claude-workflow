import { AbsoluteFill } from 'remotion'
import { colors, fonts } from './theme'
import { useSeconds } from './timing'
import type { Word } from './voice-types'

const MAX_WORDS = 4

// Short pages read better muted on a phone than a full sentence.
const paginate = (words: Word[]): Word[][] => {
  const pages: Word[][] = []
  let page: Word[] = []
  for (const word of words) {
    page.push(word)
    if (page.length >= MAX_WORDS || /[.?!,]$/.test(word.text)) {
      pages.push(page)
      page = []
    }
  }
  if (page.length) pages.push(page)
  return pages
}

export const Captions = ({ words }: { words: Word[] }) => {
  const t = useSeconds()
  const pages = paginate(words)
  const page = pages.find(
    (p, i) => t >= p[0].start && t < (pages[i + 1]?.[0].start ?? Infinity),
  )
  if (!page) return null

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 110,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 18px',
          maxWidth: 920,
          fontFamily: fonts.sans,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.15,
          textAlign: 'center',
        }}
      >
        {page.map(word => {
          const active = t >= word.start && t < word.end + 0.08
          const spoken = t >= word.start
          return (
            <span
              key={`${word.start}-${word.text}`}
              style={{
                color: active ? colors.accent : colors.text,
                opacity: spoken ? 1 : 0.35,
                transform: `scale(${active ? 1.06 : 1})`,
                textShadow: `0 4px 24px ${colors.bg}`,
              }}
            >
              {word.text}
            </span>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
