# claude-workflow

A 3-minute LinkedIn video about how I ship quality code with Claude Code.
Built with Remotion. Voice by ElevenLabs.

## Run

    pnpm install
    pnpm voice:estimate   # fake timings, no audio
    pnpm studio           # preview
    pnpm voice            # real voice (key in macOS Keychain, service "elevenlabs")
    pnpm render           # out/workflow.mp4

## Change the script

1. Edit `script/scenes.json`.
2. `pnpm voice --only <scene-id>`.
3. If a cue word changed, update `cues` in `src/storyboard.tsx`.

Store the key once:

    security add-generic-password -U -s elevenlabs -a workflow-video -w <key>
