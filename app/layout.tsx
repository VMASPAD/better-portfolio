import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

/* ── Fonts ────────────────────────────────────────────────────────────────── */
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Site-wide constants ──────────────────────────────────────────────────── */
const SITE_URL  = "https://better-portfolio-nine.vercel.app/";
const SITE_NAME = "Gitfolio";
const TAGLINE   = "Instant developer portfolios — powered by GitHub";
const DESCRIPTION =
  "Generate a beautiful, shareable portfolio in seconds using only your GitHub username. " +
  "Choose from Bento, Minimal, Vercel-style or Enterprise layouts. " +
  "No sign-up. No configuration. Just your GitHub data, beautifully presented.";

const OG_IMAGE = {
  url:    `${SITE_URL}/og-default.png`,
  width:  1200,
  height: 630,
  alt:    `${SITE_NAME} — ${TAGLINE}`,
};

/* ── Root Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  /*
   * metadataBase is required for Next.js to resolve relative URLs
   * in openGraph / twitter image fields.
   */
  metadataBase: new URL(SITE_URL),

  /* ── Core ── */
  title: {
    default:  `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,   // used by child pages: "vmaspad — Gitfolio"
  },
  description: DESCRIPTION,
  keywords: [
    "github portfolio generator",
    "developer portfolio",
    "github profile page",
    "bento grid portfolio",
    "next.js portfolio",
    "open source portfolio",
    "github api portfolio",
    "portfolio from github",
    "auto-generated developer portfolio",
    "gitfolio",
  ],
  authors:  [{ name: SITE_NAME, url: SITE_URL }],
  creator:  SITE_NAME,
  publisher: SITE_NAME,

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },

  /* ── Robots ── */
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview":  -1,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images:      [OG_IMAGE],
  },

  /* ── Twitter / X ── */
  twitter: {
    card:        "summary_large_image",
    site:        "@gitfolio",          // change to your Twitter handle
    creator:     "@gitfolio",
    title:       `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images:      [OG_IMAGE],
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.ico",               sizes: "any" },
      { url: "/icon.svg",                  type:  "image/svg+xml" },
      { url: "/icon-192.png",              type:  "image/png", sizes: "192x192" },
      { url: "/icon-512.png",              type:  "image/png", sizes: "512x512" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon-32x32.png" }],
  },

  /* ── Web app manifest ── */
  manifest: "/site.webmanifest",

  /* ── Verification tags (fill in after setting up each service) ── */
  verification: {
    google:  process.env.GOOGLE_SITE_VERIFICATION  ?? "",
    // bing:  process.env.BING_SITE_VERIFICATION    ?? "",
    // yandex:process.env.YANDEX_VERIFICATION       ?? "",
  },

  /* ── App-specific ── */
  applicationName: SITE_NAME, 
  category:        "technology",
};

/* ── Viewport (separate export, recommended since Next.js 14.1) ───────────── */
export const viewport: Viewport = {
  width:               "device-width",
  initialScale:        1,
  maximumScale:        5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
  ],
};
 

/* ── Layout ───────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en" 
      className={`${chakraPetch.variable} ${ibmPlexMono.variable}`}
    > 
    <Analytics />
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}