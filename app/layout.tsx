import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Mark-V is an independent software studio building websites, web applications, automation, and custom software. Based in the Philippines, working with clients anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mark-V — Software & Web Development",
    template: "%s — Mark-V",
  },
  description,
  applicationName: "Mark-V",
  authors: [{ name: "Mark" }],
  creator: "Mark-V",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Mark-V",
    title: "Mark-V — Software & Web Development",
    description,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark-V — Software & Web Development",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#11161A",
  colorScheme: "light",
};

/**
 * Structured data. `Person` plus `ProfessionalService` is what gives the
 * location-qualified searches something to match — the copy alone is not enough.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mark-V",
  description,
  url: site.url,
  email: `mailto:${site.email}`,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.region,
  },
  founder: { "@type": "Person", name: site.operator, jobTitle: "Software Developer" },
  knowsAbout: [
    "Web development",
    "Web application development",
    "Backend and API development",
    "Workflow automation",
    "Custom software development",
  ],
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-ink focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
