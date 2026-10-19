import { Composition } from 'remotion'
import { video } from './theme'
import { totalFrames, WorkflowVideo } from './video'

export const Root = () => (
  <Composition
    id="workflow"
    component={WorkflowVideo}
    durationInFrames={totalFrames()}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
)
