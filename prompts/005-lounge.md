# 005 — Lounge: interviewing rooms, My schedule, timeframe modal

## Goal
Build `/lounge` to match `design/05-lounge-rooms.jpg` and `design/06-lounge-timeframe-modal.jpg`; add a placeholder `/lounge/[roomId]` for "Take a seat".

## Decisions & assumptions
- Logos (38×38) and seat/queue avatars are **cropped from design/05** into `public/logos/` and `public/avatars/` — no other source was provided. Seat photos keep the design's top-down rotation (people face the table), so they're only used on tables.
- Room data mirrors the reference: only Bank of Africa has a free seat → "Take a seat" (→ `/lounge/bank-of-africa`); all others → "Reserve a seat" → timeframe modal.
- Seed schedule (Bank of Africa 45 min, Deloitte 60 min) is constant; reservations from the modal are appended from the store and show "Scheduled for Tue, Oct 6 at 3:00pm". Reserved rooms show "✓ Seat reserved".
- Timeframe modal: 7 days from a fixed Monday (2026-10-05) to keep SSR stable; weekdays 1–5pm, weekends "No interview slots on this day." Next stays red like the design; without a slot it shows a hint instead of confirming.
- Grid uses `repeat(auto-fill, minmax(300px, 1fr))` → 3 columns at the 1386px reference, 2 at 1024, 1 on phones; schedule moves under the rooms below `lg`.
- Tag colours re-sampled from the reference (muted); added a separate `danger` token for error text.
- New tokens: `seat-empty`; modal background corrected to `surface` (sampled #18142A).

## Measurements (1386px)
Room card 323×302, 11/12px padding, tables 72×159 incl. chair arcs, 12px apart, arcs at +69px from card top; footer button 145×44 at 404–448. Schedule column 346px (`border-l divider`), cards 300×88, 12px apart. Modal 410px, date badge 50px, slots 128×34 / 8px gap, buttons 144×44.

## Checks
lint, tsc, build; e2e: counts, modal focus trap / Esc / backdrop / focus return, weekend empty state, Next hint, reserve → schedule + "Seat reserved", reload persistence, Take a seat route, unknown room 404, 1024 & 375 no horizontal scroll; pixel comparison for room card, schedule card and modal.
