import type { Metadata, Viewport } from "next";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Agaman Thapa | Cybersecurity Student & Developer";
const description =
  "Cybersecurity student, developer and technology enthusiast based in Kathmandu, Nepal. Exploring cybersecurity, Python, software development, web technologies, financial technology and innovative digital projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Agaman Thapa" },
  description,
  applicationName: "Agaman Thapa — Portfolio",
  authors: [{ name: "Agaman Thapa" }],
  keywords: [
    "Agaman Thapa",
    "cybersecurity student",
    "The British College",
    "Kathmandu",
    "Nepal",
    "Python",
    "software development",
    "web development",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: "Agaman Thapa",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
