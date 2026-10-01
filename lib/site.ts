/** Site-wide identity used by metadata, the manifest and the social image. */
export const SITE = {
  name: "Youth for Challenge",
  shortName: "YFC Job Fair",
  title: "Youth for Challenge — Virtual Job Fair",
  description:
    "Prepare your profile with AI CV scanning, learn from recruiting experts, and interview live with companies in the virtual lounge.",
  /** Absolute origin for Open Graph URLs. Set NEXT_PUBLIC_SITE_URL when deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Matches --color-bg. Metadata needs a literal value, not a CSS variable. */
  themeColor: "#0c081f",
} as const;
