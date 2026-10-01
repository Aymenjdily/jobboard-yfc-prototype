import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppNav } from "@/components/layout/AppNav";
import { SITE } from "@/lib/site";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Icons (favicon.ico, icon.svg, apple-icon.png), the manifest and the Open Graph image
// come from file conventions in app/ — Next adds their tags automatically.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["job fair", "virtual job fair", "Morocco", "jobs", "internships", "recruitment", "CV", "interview"],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  appleWebApp: {
    title: SITE.shortName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  // Prototype with fake data and a paid AI route: keep it out of search engines until launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <AppNav />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
