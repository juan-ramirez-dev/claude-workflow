import { Fragment } from 'react'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import { slide } from '@remotion/transitions/slide'
import { AbsoluteFill, Html5Audio, staticFile } from 'remotion'
import { Captions } from './captions'
import { Backdrop } from './components/backdrop'
import { Stage } from './components/stage'
import { storyboard } from './storyboard'
import { video } from './theme'
import { resolveCues, sceneFrames, voice } from './timing'
import type { VoiceScene } from './voice-types'

const Scene = ({ scene }: { scene: VoiceScene }) => {
  const board = storyboard[scene.id]
  const at = resolveCues(scene.words, board.cues, scene.duration)
  return (
    <AbsoluteFill>
      {scene.audio && <Html5Audio src={staticFile(scene.audio)} />}
      <Stage label={board.label}>{board.render(at)}</Stage>
      <Captions words={scene.words} />
    </AbsoluteFill>
  )
}

export const totalFrames = (): number =>
  voice.scenes.reduce((sum, s) => sum + sceneFrames(s.duration), 0) -
  (voice.scenes.length - 1) * video.transitionFrames

export const WorkflowVideo = () => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries>
      {voice.scenes.map((scene, i) => (
        <Fragment key={scene.id}>
          {i > 0 && (
            <TransitionSeries.Transition
              // Alternating keeps cuts from feeling repetitive.
              presentation={i % 2 ? slide({ direction: 'from-bottom' }) : fade()}
              timing={linearTiming({ durationInFrames: video.transitionFrames })}
            />
          )}
          <TransitionSeries.Sequence durationInFrames={sceneFrames(scene.duration)}>
            <Scene scene={scene} />
          </TransitionSeries.Sequence>
        </Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
)
