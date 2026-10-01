import Image from "next/image";

// Both banners are built in code (not screenshots) so they stay sharp. Proportions follow design/04
// (663×171 at the reference size); inner sizes use container units so they scale with the card.

/** Red "spotlight" banner: people in grayscale on a red grid with a central light. Photo: Pexels 7202895. */
export function SpotlightBanner() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate aspect-[663/171] w-full overflow-hidden bg-[linear-gradient(90deg,var(--color-conf-red-deep),var(--color-conf-red)_22%,var(--color-conf-red-hot)_50%,var(--color-conf-red)_78%,var(--color-conf-red-deep))]"
    >
      {/* Grid */}
      <div className="absolute inset-y-0 left-[18%] right-[13%] top-[12%] bg-[linear-gradient(to_right,rgb(255_255_255/0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.16)_1px,transparent_1px)] bg-[size:2.1cqw_2.1cqw]" />
      {/* Spotlight */}
      <div className="absolute inset-y-0 left-1/2 w-[42%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(232_224_224/0.55)_22%,var(--color-conf-spot)_40%,var(--color-conf-spot)_60%,rgb(232_224_224/0.55)_78%,transparent)]" />
      {/* People — multiply turns the white studio backdrop into the red background */}
      <Image
        src="/conferences/lineup.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-[50%_32%] mix-blend-multiply brightness-110 contrast-125 grayscale"
      />
    </div>
  );
}

/** Typographic workshop banner with the speaker in an orange ring. Photo: Pexels 32064778. */
export function WorkshopBanner() {
  return (
    <div aria-hidden="true" className="relative aspect-[663/171] w-full overflow-hidden bg-white">
      <div className="absolute top-1/2 left-[4.5%] max-w-[58%] -translate-y-1/2">
        <p className="text-[4cqw] leading-none font-extrabold tracking-tight text-workshop-blue">Recruitment Skills</p>
        <p className="mt-[0.6cqw] text-[6.2cqw] leading-none font-extrabold tracking-tight text-workshop-orange">1 Day Workshop</p>
        <p className="mt-[2cqw] font-serif text-[2.5cqw] leading-snug text-black/85">
          Mastering Recruitment: Essential Skills for Hiring Professionals!
        </p>
      </div>
      {/* Decorative blue arc behind the portrait */}
      <div className="absolute -top-[22%] -right-[7%] aspect-square w-[40%] rounded-full border-[1.6cqw] border-workshop-blue" />
      <div className="absolute -top-[15%] right-[-1%] aspect-square w-[35.6%] overflow-hidden rounded-full border-[1.5cqw] border-workshop-orange bg-white">
        <Image src="/conferences/workshop-speaker.jpg" alt="" fill sizes="(min-width: 768px) 240px, 36vw" className="object-cover object-[50%_20%]" />
      </div>
    </div>
  );
}
