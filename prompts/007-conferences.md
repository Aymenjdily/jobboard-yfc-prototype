# 007 — Conferences

## Goal
Build `/conferences` from `design/04-conferences.jpg`.

## Decisions & assumptions
- Nav uses the Youth for Challenge logo and Reception → Conferences → Lounge order (design/04 shows an older "efe" variant — AGENTS.md §8.1).
- Banners rebuilt in code for sharpness: red spotlight banner = brand-red gradient + grid + spotlight + grayscale studio lineup (Pexels 7202895) with `mix-blend-multiply`; workshop banner = HTML typography + speaker portrait (Pexels 32064778) in an orange ring. Both use `aspect-[663/171]` and `cqw` sizes.
- Speakers: Adil Mansour (Pexels 10816007), Yassine Berrada (Pexels 32064778), Lina Chen (reused). 256px crops for the 74px photos.
- Cards 3–6 vary the repeated placeholder title from the design.
- Reserve toggles "✓ Seat reserved" (persisted, `aria-pressed`); titles wrap to 2 lines on phones.
- New tokens: `conf-red-deep`, `conf-red`, `conf-red-hot`, `conf-spot`, `workshop-orange`, `workshop-blue`.
- Poppins (resume) set to `preload: false` — the Lounge prefetches room pages and was downloading 4 unused font files.

## Measurements (1386px)
Cards 663×279, 12px gap; banner 171px; footer 108px (`surface-2`), 16px side padding; photo 74px at +17px; title 22px at +10px; button 144×45, 11px under the title, 14px bottom padding.

## Checks
lint, tsc, build; e2e: 6 cards, reserve toggle + reload persistence + un-reserve, no broken images, 375px no horizontal scroll, console clean; geometry within 1px of the reference; 2× screenshot for sharpness. Full regression of tasks 002–006 e2e suites.
