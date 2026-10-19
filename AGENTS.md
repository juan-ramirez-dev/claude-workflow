# AGENTS.md

Video de LinkedIn sobre mi flujo con Claude, hecho con Remotion.

## Cómo escribir

- Frases cortas. Viñetas. Una idea por línea.
- Comentarios: solo el **por qué**.

## Estructura

- `script/scenes.json` → texto narrado. Única fuente para la voz.
- `src/storyboard.tsx` → qué se ve en cada escena y en qué palabra aparece.
- `src/scenes/` → un componente por tipo de visual.
- `src/generated/voice.json` → lo escribe `pnpm voice`. No editar a mano.
- Archivos en kebab-case.

## Reglas

- Solo pnpm (`pnpm dlx` en vez de `npx`).
- Colores literales solo en `src/theme.ts`. El resto usa `colors.x`.
- Sin `any`, `@ts-ignore` ni `eslint-disable`.
- API key de ElevenLabs solo en el Keychain (`security ... -s elevenlabs`). Nunca en archivos ni logs.
- Repo público: nada de nombres de empresa, clientes ni datos privados.

## Terminado

- `pnpm check` pasa.
- `pnpm render` genera `out/workflow.mp4` de ≤ 3:00.
