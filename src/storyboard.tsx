import type { ReactNode } from 'react'
import { EndCard } from './scenes/end-card'
import { FlowDiagram } from './scenes/flow-diagram'
import { KineticTitle } from './scenes/kinetic-title'
import { QuestionCard } from './scenes/question-card'
import { RepoGrid } from './scenes/repo-grid'
import { RulesFile } from './scenes/rules-file'
import { SpeedCounter } from './scenes/speed-counter'
import { TerminalBlock } from './scenes/terminal-block'
import { TestReview } from './scenes/test-review'
import { ThreeLayers } from './scenes/three-layers'

// Visuals per scene id. `cues` are spoken words from script/scenes.json;
// render() gets the second each cue is said, so visuals follow the voice.
type Board = {
  label: string
  cues: string[]
  render: (at: number[]) => ReactNode
}

export const storyboard: Record<string, Board> = {
  hook: {
    label: 'AI-assisted engineering',
    cues: ['I', 'to', 'So', 'that'],
    render: at => (
      <KineticTitle
        lines={["I don't trust AI", 'to write good code.', 'So I built a system', "that doesn't need trust."]}
        accentFrom={2}
        at={at}
      />
    ),
  },
  problem: {
    label: 'The problem',
    cues: ['writes', 'goal', 'Shipping'],
    render: at => <SpeedCounter at={at} />,
  },
  flow: {
    label: 'The flow',
    cues: ['Granola', 'Linear', 'Figma', 'writes', 'Vercel'],
    render: at => (
      <FlowDiagram
        at={at}
        nodes={[
          { tool: 'Granola', step: 'meeting → notes', glyph: '✎' },
          { tool: 'Linear', step: 'notes → tickets', glyph: '◆' },
          { tool: 'Figma', step: 'design, read via MCP', glyph: '◐' },
          { tool: 'Claude Code', step: 'tickets + design → code', glyph: '</>' },
          { tool: 'Vercel', step: 'live preview per PR', glyph: '▲' },
        ]}
      />
    ),
  },
  rules: {
    label: 'One rules file',
    cues: ['rules', 'any', 'hardcoded', 'silencing', 'features'],
    render: at => (
      <RulesFile
        filename="AGENTS.md"
        rules={['any types', 'hardcoded colors', 'silenced lint rules', 'features nobody asked for']}
        at={at}
      />
    ),
  },
  hooks: {
    label: 'Hooks: rules that enforce themselves',
    cues: ['hooks', 'color', 'name', 'main', 'Skip', 'linter'],
    render: at => (
      <TerminalBlock
        at={at}
        entries={[
          { command: 'edit button.tsx  # inline color', verdict: 'BLOCKED', note: 'use a design token' },
          { command: 'write UserCard.tsx', verdict: 'BLOCKED', note: 'rename → user-card.tsx' },
          { command: 'git push origin main', verdict: 'BLOCKED', note: 'open a pull request' },
          { command: 'git commit --no-verify', verdict: 'HARD BLOCK', note: "fix it, don't skip it" },
          { command: 'eslint --fix user-card.tsx', verdict: 'FIXED', note: '0 problems' },
        ]}
      />
    ),
  },
  plan: {
    label: 'Plan first, then code',
    cues: ['planner', 'question', 'choose', 'codes'],
    render: at => (
      <QuestionCard
        question="Where should this logic live?"
        options={['Data layer (recommended)', 'Native command', 'UI component']}
        pick={0}
        at={at}
      />
    ),
  },
  tests: {
    label: 'Tests & review',
    cues: ['proposes', 'pick', 'Jest', 'Cypress', 'four', 'fifth', 'wrong'],
    render: at => (
      <TestReview
        cases={['pay day 31 in a 30-day month', 'empty import file', 'duplicate entry']}
        picked={[0, 2]}
        reviewers={['React', 'Data', 'Perf', 'a11y', 'Refuter']}
        at={at}
      />
    ),
  },
  layers: {
    label: 'Three layers of guardrails',
    cues: ['writes', 'commit', 'merges', 'launch'],
    render: at => (
      <ThreeLayers
        layers={[
          { when: 'When Claude writes', what: 'Claude Code hooks' },
          { when: 'When I commit', what: 'Husky + lint-staged' },
          { when: 'When CI merges', what: 'lint · types · tests · build' },
        ]}
        platforms={['macOS', 'Windows']}
        at={at}
      />
    ),
  },
  scale: {
    label: 'Every project',
    cues: ['every', 'template'],
    render: at => <RepoGrid at={at} />,
  },
  close: {
    label: '',
    cues: ['AI', 'Your', 'Follow'],
    render: at => (
      <EndCard cta="Follow me" at={at} />
    ),
  },
}
