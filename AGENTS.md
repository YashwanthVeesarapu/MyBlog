# AGENTS.md

Guidance for Codex working in this repo.

## Project overview
- Next.js App Router blog site.
- Source code lives under `src/`.
- Routes live under `src/app/`.
- Shared UI lives in `src/components/` and `src/layouts/`.
- API/data access lives in `src/services/`.

## Environment
- Node/NPM project. Primary scripts in `package.json`.
- Common commands:
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run start`

## Coding conventions
- Use TypeScript and React conventions already present.
- Prefer server components by default; add `"use client"` only when needed.
- Keep components small and focused; avoid unnecessary abstraction.
- Follow existing folder structure and naming patterns.
- Keep CSS/SCSS changes scoped to the route or component where possible.

## Editing rules
- Do not remove or rewrite existing functionality unless requested.
- If you need to add config or env values, create/update `.env.example`.
- Avoid committing large auto-generated changes unless requested.

## Testing and verification
- Run `npm run lint` after non-trivial changes.
- Note any manual verification steps if you cannot run the app.
