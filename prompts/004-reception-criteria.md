# 004 — Reception stepper: Criteria (step 3)

## Goal
Build step 3 of `/reception/profile` to match `design/03-reception-step3-criteria.jpg`: Regions + Industry multi-selects (max 3 each) with removable chips; **Start** completes the profile and goes to `/lounge`.

## Design references
`design/03-reception-step3-criteria.jpg`

## Decisions & assumptions
- Multi-select is a searchable ARIA combobox + listbox (`components/ui/MultiSelect.tsx`): type to filter, ↑/↓ + Enter to toggle, Esc closes, Backspace on empty removes the last chip, click outside closes. At 3 picks other options are disabled with a hint. Dropdown list has no design — styled from tokens (`surface-raised`, `surface-2` hover).
- Chips measured from the reference: opaque `#1E1216` fill (new `chip-bg` token), `border-primary/70`, text `#D9828F` (`primary-text` updated). Shared with the skills chips in step 2.
- Criteria panel hugs its content (`lg:self-start`), unlike step 1's full-height panel — as in the reference.
- Start is enabled when CV is scanned, step 2 is valid, and ≥1 region + ≥1 industry are chosen → `completeProfile` → `/lounge` (placeholder). This unlocks the landing's "Set preferences" and "Go to workshops".
- Copy fix: Industry placeholder "Choose up to 3 industries" (design says "regions").
- Motion: chips `fade-in-up` on add; list `fade-in`; chevron rotates when open.

## Measurements (1386px)
Title 20/600 at panel padding 22; label 14/500 white, 3px above a 54px input; chips 17px under the input, 31px tall, 8px apart; 23px between the two groups; panel bottom padding 22.

## Checks
lint, tsc, build; e2e: max-3 limit, keyboard filtering, Backspace, chip removal, Start gating, reload persistence, Start → `/lounge`, landing unlocks, fresh visitor deep link → step 1, 375px no horizontal scroll; pixel comparison vs reference.
