import { Briefcase, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import type { Experience, ParsedCv } from "@/lib/types";

// The resume is a document, not app UI: it keeps the template's Poppins type (design/07).
// Not preloaded: the Lounge prefetches room pages, and preloading would pull these fonts into every Lounge visit.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], preload: false, display: "swap" });

// All sizes are in container-query units (cqw) of the stage width, measured on the 884px reference stage,
// so the document scales like a real page preview.

function year(value: string | null) {
  if (!value) return "Now";
  return value.match(/\d{4}/)?.[0] ?? value;
}

function bullets(description: string) {
  return description
    .split(/(?<=[.;])\s+/)
    .map((line) => line.replace(/[.;]$/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

function Heading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-[2.3cqw] text-[2.3cqw] font-semibold tracking-[0.02em] text-resume-ink">
      <span className="[&>svg]:size-[2.3cqw]">{icon}</span>
      {children}
    </h3>
  );
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-[2.3cqw] text-[1.6cqw] leading-snug text-resume-ink">
      <span className="flex size-[2.1cqw] shrink-0 items-center justify-center bg-resume-band [&>svg]:size-[1.3cqw]">{icon}</span>
      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  return (
    <li className="grid grid-cols-[6.5cqw_1fr] gap-x-[2cqw]">
      <p className="flex flex-col items-center pt-[0.3cqw] text-[1.36cqw] leading-[1.9] font-semibold tracking-[0.1em] text-resume-ink">
        <span>{year(item.start)}</span>
        <span aria-hidden="true">–</span>
        <span>{year(item.end)}</span>
      </p>
      <div className="border-l border-resume-line pl-[2cqw]">
        <p className="text-[1.8cqw] font-semibold text-resume-ink">{item.company}</p>
        <p className="mt-[0.3cqw] text-[1.42cqw] text-resume-ink/80">{item.role}</p>
        <ul className="mt-[1cqw] list-disc space-y-[0.4cqw] pl-[2.2cqw] text-[1.36cqw] leading-relaxed text-resume-ink/80">
          {bullets(item.description).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

interface SharedResumeProps {
  cv: ParsedCv;
  photo?: string;
}

/** The candidate's CV rendered in the designer's resume template (design/07 stage). */
export function SharedResume({ cv, photo }: SharedResumeProps) {
  return (
    <article
      aria-label={`Resume of ${cv.fullName}`}
      className={`${poppins.className} relative min-h-full bg-white pb-[8cqw] tracking-normal text-resume-ink`}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[17.5cqw] bg-resume-band" />

      <div className="relative grid grid-cols-[36.1cqw_1fr] gap-x-[4.1cqw] pl-[3.7cqw] pr-[3.4cqw]">
        {/* Left: framed photo, contact, education, skills */}
        <aside className="mt-[5.1cqw] border border-b-0 border-resume-line px-[3.3cqw] pt-[3.1cqw] pb-[4cqw]">
          <div className="relative aspect-[260/288] w-full overflow-hidden bg-resume-band">
            {photo ? (
              <Image src={photo} alt="" fill sizes="(min-width: 1024px) 380px, 40vw" className="object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center text-[8cqw] font-semibold text-resume-ink/40">
                {cv.fullName
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")}
              </span>
            )}
          </div>

          <ul className="mt-[5.3cqw] space-y-[2.3cqw]">
            {cv.phone && <ContactRow icon={<Phone />}>{cv.phone}</ContactRow>}
            {cv.email && <ContactRow icon={<Mail />}>{cv.email}</ContactRow>}
            {cv.location && <ContactRow icon={<MapPin />}>{cv.location}</ContactRow>}
          </ul>

          {cv.education.length > 0 && (
            <section className="mt-[6cqw]">
              <h3 className="bg-resume-band/50 py-[0.4cqw] text-[2.3cqw] font-semibold text-resume-ink">Education</h3>
              <ul className="mt-[2cqw] space-y-[2cqw]">
                {cv.education.map((edu) => (
                  <li key={`${edu.school}-${edu.degree}`} className="text-[1.45cqw] leading-snug">
                    <p className="font-semibold">{edu.degree || edu.school}</p>
                    {edu.degree && <p className="text-resume-text">{edu.school}</p>}
                    <p className="text-resume-text">{[edu.start, edu.end].filter(Boolean).join(" – ")}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cv.skills.length > 0 && (
            <section className="mt-[5cqw]">
              <h3 className="bg-resume-band/50 py-[0.4cqw] text-[2.3cqw] font-semibold text-resume-ink">Skills</h3>
              <ul className="mt-[2cqw] list-disc space-y-[0.8cqw] pl-[2.2cqw] text-[1.45cqw]">
                {cv.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right: name, title, profile, work experience */}
        <div className="pt-[11.6cqw]">
          <h2 className="text-[5.4cqw] leading-none font-bold tracking-[0.06em] uppercase">{cv.fullName}</h2>
          {cv.title && <p className="mt-[1.2cqw] text-[2.3cqw] tracking-[0.12em]">{cv.title}</p>}

          {cv.summary && (
            <section className="mt-[5.2cqw]">
              <Heading icon={<UserRound />}>Profile</Heading>
              <p className="mt-[2.2cqw] text-justify text-[1.53cqw] leading-[1.65] tracking-[0.05em] text-resume-text">
                {cv.summary}
              </p>
            </section>
          )}

          {cv.experiences.length > 0 && (
            <section className="mt-[5.5cqw]">
              <Heading icon={<Briefcase />}>Work Experience</Heading>
              <ol className="mt-[3.4cqw] space-y-[5cqw]">
                {cv.experiences.map((item, i) => (
                  <ExperienceItem key={`${item.company}-${i}`} item={item} />
                ))}
              </ol>
            </section>
          )}

          {cv.experiences.length === 0 && cv.skills.length === 0 && (
            <p className="mt-[5cqw] text-[1.5cqw] text-resume-text">No experience listed yet.</p>
          )}
        </div>
      </div>
    </article>
  );
}
