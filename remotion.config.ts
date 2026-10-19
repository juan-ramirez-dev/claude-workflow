import { Config } from '@remotion/cli/config'

Config.setVideoImageFormat('jpeg')
// LinkedIn re-encodes uploads; a high-quality source survives that better.
Config.setCrf(16)
