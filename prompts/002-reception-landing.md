# 002 — App nav + Reception landing

## Goal
Build the shared top navigation and the Reception landing page ("Create your profile to start applying") to match `design/01-reception-landing.jpg`.

## Design references
- `design/01-reception-landing.jpg` (primary)
- Nav also cross-checked against `design/03-reception-step3-criteria.jpg`, `design/05-lounge-rooms.jpg`.

## Docs read
- `01-app/01-getting-started/03-layouts-and-pages.md` (linking, `usePathname` for active links)
- `01-app/03-api-reference/02-components/image.md` (local static image import)

## Code inspected
`app/layout.tsx`, `app/globals.css`, `lib/store.tsx`, `lib/types.ts`.

## Measurements (from the 1386px reference)
- Nav: 53px tall incl. 1px `border-divider` bottom; 32px side padding. Logo ≈32px tall. Links 14px, 32px apart, active = `text-fg` + 3px white bar flush to bottom; inactive `text-fg-muted`. Right icons 20px, 24px apart; unread dot 8px `bg-notification`; avatar 20px rounded-sm.
- Hero: title 20px/600 `text-fg` starts ≈144px below nav; subtitle 16px `text-fg-secondary`, 8px below.
- Cards: 3 × 323px, 12px gap (993px total), 300px tall, 44px below subtitle. `bg-surface`, 1px `border-border`, `rounded-lg`. Padding 48px top / 22px sides & bottom. Icon circle 80px `bg-surface-3`, icon 32px. Title 16px/600 (20px under circle), description 16px `text-fg-secondary` (8px under), button 44px tall (28px under).
- Enabled button `bg-btn text-fg`; disabled `bg-btn-disabled text-btn-disabled-fg`.

## Decisions & assumptions
- Logo: user-supplied Youth for Challenge logo recolored to white (`public/logos/youth-for-challenge-white.png`). It includes Arabic + Tifinagh lines that the mock's English-only wordmark doesn't — used as given, per the user.
- Card icons don't exist in lucide (they're Tabler-style). Drawn as custom inline SVGs in `components/icons/`. Nav message icon = lucide `MessageCircle` + two text lines to match the reference.
- Nav right icons (news, people, messages, notifications) are visual only — no destinations exist in scope.
- Avatar: no photo provided → monogram fallback for mock user "Khalil El Kabiri" (`lib/data/people.ts`).
- Cards: "Start" → `/reception/profile?step=1`. "Set preferences" → `/reception/profile?step=3` and "Go to workshops" → `/conferences`, both disabled until `profileComplete` (AGENTS.md §8.3).
- `/reception/profile`, `/conferences`, `/lounge` get placeholder pages so nav links and "Start" don't 404; they're replaced in later tasks.
- Copy fix: "Upload you CV" → "Upload your CV". Descriptions stay "First step description".

## Files to create / change
- `components/layout/AppNav.tsx`, `components/layout/NavLinks.tsx` (client)
- `components/ui/Button.tsx`, `components/ui/Avatar.tsx`
- `components/icons/ReceptionIcons.tsx` (message-lines drawn as children of lucide `MessageCircle` in `AppNav`)
- `components/reception/ReceptionStepCards.tsx` (client — reads store)
- `lib/data/people.ts`
- `app/layout.tsx` (mount nav), `app/reception/page.tsx`
- Placeholders: `app/reception/profile/page.tsx`, `app/conferences/page.tsx`, `app/lounge/page.tsx`

## Acceptance criteria
- At 1386px the page lines up with the reference (positions within a few px).
- Active tab follows the route; Reception active on `/reception` and `/reception/profile`.
- Only "Start" is enabled on a fresh profile; others enable after `profileComplete`.
- No horizontal scroll at 375px; cards stack; nav links scroll horizontally.

## Checks to run
`npm run lint`, `npx tsc --noEmit`, `npm run build`, dev server + screenshot comparison at 1386×864 and 375px.

## Manual test steps
1. Open `/` → lands on `/reception`, Reception tab underlined.
2. Tab through: nav links, icon buttons, Start get visible focus rings; disabled buttons are skipped.
3. Click Start → `/reception/profile?step=1` placeholder; Reception still active.
4. Click Conferences / Lounge → placeholders, underline moves.
5. Resize to 375px → single-column cards, no horizontal page scroll.
