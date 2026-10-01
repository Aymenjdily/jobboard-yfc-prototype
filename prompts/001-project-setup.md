# 001 — Project setup

## Goal
Scaffold the Next.js app and lay the foundation every screen builds on: design tokens, font, utilities, types, store, and base mock lists. No screens yet.

## Design references
All of `design/` — used only to confirm tokens (AGENTS.md §4.2) and typography (§4.3).

## Docs read
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (`next/font/google`)
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` (global `PageProps` / `LayoutProps`, async `params`)
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/redirect.md`

## Code inspected
Empty repo + `create-next-app@16.3.8` output (TS, Tailwind v4, ESLint, App Router, no `src/`, `@/*` alias).

## Decisions & assumptions
- Next 16.3.8, React 19.2, Tailwind v4 (CSS-first, no config file).
- Next's generated agent-rules block is kept at the top of `AGENTS.md`; `CLAUDE.md` imports `AGENTS.md`.
- Dark only: tokens are set directly in `@theme`, no `prefers-color-scheme` switching.
- `/` redirects to `/reception`; `/reception` is a temporary placeholder until task 002.
- Store = React Context + `useReducer`, persisted to `localStorage` key `yfc-state-v1`, hydrated after mount.
- Only industries and regions are seeded now; each feature adds its own mock data.

## Files to create / change
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/reception/page.tsx` (placeholder)
- `lib/utils.ts`, `lib/types.ts`, `lib/store.tsx`, `lib/data/industries.ts`, `lib/data/regions.ts`
- `public/{logos,avatars,conferences,resumes}/` (empty, `.gitkeep`)
- Remove create-next-app boilerplate SVGs.

## Requirements
- Every token from AGENTS.md §4.2 available as a Tailwind utility.
- Inter loaded via `next/font/google` and used as `font-sans`.
- `cn()` helper; all AGENTS.md §9 types exported.
- Store exposes `useAppStore()` → `{ state, dispatch, hydrated }`.

## Acceptance criteria
- `npm run lint`, `npx tsc --noEmit`, `npm run build` pass.
- `/` lands on `/reception` with the dark background and Inter font.

## Checks to run
`npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run dev` + open `/`.

## Manual test steps
1. `npm run dev`, open http://localhost:3000 → URL becomes `/reception`.
2. Background is `#0C081F`, text renders in Inter.
