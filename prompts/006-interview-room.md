# 006 — Interview room (`/lounge/[roomId]`)

## Goal
Build the interview call screen from `design/07-lounge-interview-room.jpg` and the Notes panel from `design/08-lounge-interview-room-notes.jpg`.

## Decisions & assumptions
- Designs 07/08 are exported at 1200px (0.866× of the 1386px system): component sizes scaled ×1.155 (46px controls, 296×179 tiles, 23px gutters, 416px notes panel). Vertical layout is fluid — exactly one screen tall on desktop so the controls stay visible.
- Stage = the candidate's own CV (store profile → `SAMPLE_RESUME` fallback) rendered in the designer's resume template with Poppins, sized in container units (`cqw`) so it scales like a page preview; scrollable; bottom fade + "Interviewee's Resume" badge.
- Video tiles are static photos (no real call). New high-res, free-licensed images: interviewer Lina Chen (Pexels 8101312) and the candidate (Unsplash ZOPIJ2m7cPY). Her lounge seat avatar and the user's nav avatar are cropped from the same photos, so faces stay consistent from Lounge → room.
- Lounge seats: candidate on top, interviewer at the bottom; Bank of Africa's free seat is the candidate seat across from Lina, so "Take a seat" leads to her.
- Notes are private to the candidate: no seeded recruiter notes. Esc / X close, focus returns to the Notes button.
- Mic starts muted (as designed); camera toggle shows a "Camera off" tile; share / more / emoji are labelled no-ops; leave → `/lounge`.
- New tokens: `resume-band`, `resume-ink`, `resume-text`, `resume-line` (document palette, resume only). `Person.video` field; `InterviewRoom.participantCount` replaces `participants`.

## Checks
lint, tsc, build (rooms statically generated); e2e: Take a seat → room, title, resume owner, tile labels, page = viewport height, mic/camera toggles, notes empty state/focus/add via Enter + button/Esc/focus return/reload persistence, resume scroll, leave → lounge, 375px no horizontal scroll, console clean; side-by-side with design 07 and 08.
