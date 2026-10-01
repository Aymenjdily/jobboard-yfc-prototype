# 003 — Reception stepper: Upload CV + AI scanning + Scanning results

## Goal
Build `/reception/profile` steps 1 and 2: upload a CV, extract it with OpenAI on the server, and let the candidate review/edit the result. Step 3 (Criteria) stays a placeholder for task 004.

## Design references
- `design/02-reception-step1-upload-scanning.jpg` — header, stepper, dashed preview frame, scanning overlay.
- `design/03-reception-step3-criteria.jpg` — panel title / label / input styles, reused for step 2 (which has no design).

## Docs read
- `next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` (`request.formData()`)
- `next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` (`server-only`)
- `next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md` (Suspense requirement → read `searchParams` on the server instead)
- `openai` 7.26 types: `responses.parse`, `ResponseInputFile` (`file_data`), `ResponseInputImage`, `helpers/zod` (`zodTextFormat`, Zod v4 supported)

## Decisions & assumptions
- **User decision:** CV scanning uses real OpenAI extraction (AGENTS.md §2, §6, §10 updated). Model `gpt-5.4-mini` (fast/cheap, reads PDFs + images), override with `OPENAI_MODEL`. Reasoning effort `low`.
- Key lives in `.env.local` (git-ignored) and is read only in `lib/server/cv-parser.ts` (`import "server-only"`).
- PDF preview = browser PDF viewer in an `<iframe>` (no pdf.js). Image preview = `<img>`.
- Overlay: `bg-bg/65` over the preview (sampled: white page → `#5c5c60`), sparkles = two gold 4-point stars, text 24px/600 white.
- States without a design (flagged): empty dropzone, scan error, "already scanned" on return, step 2 form layout.
- Step 2 fields edit the store directly (no draft); Next requires full name + valid email.
- Header actions: Cancel → `/reception`; Next disabled while scanning / until valid.
- Stepper items are links to reachable steps; `aria-current="step"` on the active one.
- Copy fix: "Fill out your criterias" → "Fill out your criteria"; "Upload your cv" kept as written.

## Files
- `lib/cv-upload.ts`, `lib/server/cv-parser.ts`, `app/api/cv/parse/route.ts`
- `app/reception/profile/page.tsx`
- `components/reception/{ProfileWizard,StepList,UploadCvPanel,ScanningOverlay,ScanResultsPanel}.tsx`
- `components/ui/{Field,Chip}.tsx`, `components/layout/PageHeader.tsx`
- `lib/types.ts` (+ `ParsedCv`), `.env.example`, `.gitignore`

## Measurements (1386px)
Header: title 20/600 at y≈79, subtitle 16 `fg-secondary`; Cancel + Next 144×44, 8px apart, right-aligned. Stepper panel 398px wide, 22px padding, items 48px circles 14px apart, title 16 (active 600 white / inactive 500 `fg-secondary`), desc 12 (active `#adaabd` / inactive `fg-muted`). Right panel starts 20px right, 22px padding, dashed frame `rounded-xl`. Criteria panel: title 20/600, label 14/500 white, input 54px tall, 16px text inset, 30px between sections.

## Acceptance criteria
- PDF and image CVs extract into step 2 with no invented data; non-CV → clear error; wrong type / >5 MB rejected on client and server.
- Key never reaches the client bundle; no key in logs or responses.
- Step 1 visually matches the reference while scanning.

## Checks
`npm run lint`, `npx tsc --noEmit`, `npm run build`, `grep -r "sk-proj" .next/static` (expect nothing), live API test with a sample PDF CV, an image CV and a non-CV file, screenshot comparison.

## Manual test steps
1. `/reception` → Start → `/reception/profile?step=1`.
2. Drop a PDF CV → preview + "Scanning the document" → overlay clears, Next enables.
3. Next → step 2 pre-filled; clear Full name → Next disables; fix it → Next → step 3 placeholder.
4. Upload a `.docx` or a 6 MB file → inline error, no request sent.
5. Upload a non-CV image → "This file doesn't look like a CV." with retry options.
6. Reload on step 2 → data still there; open step 2 in a fresh browser → redirected to step 1.
