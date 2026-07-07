import type { Metadata, Viewport } from "next";
import "./globals.css";
import { allKeywords, site, siteUrl } from "./lib/site";
import { TrafficTracker } from "./components/TrafficTracker";
import { ImagePersonalizer } from "./components/ImagePersonalizer";

const title = site.seo.home.title;
const description = site.seo.home.description;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#160b0b"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${site.business.businessName}`
  },
  description,
  keywords: allKeywords,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: site.business.businessName,
    images: [
      {
        url: site.seo.home.ogImage,
        width: 1800,
        height: 1200,
        alt: `Best, Premium Spa in ${site.business.city}`
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.seo.home.ogImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "spa and wellness",
  verification: {
    google: "mp-lwIB2jjyuqluYkqCU3RkOoj3EeXGB9wqKqyUurKY"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <TrafficTracker />
        <ImagePersonalizer />
        {children}
      </body>
    </html>
  );
}


{/* <meta name="google-site-verification" content="mp-lwIB2jjyuqluYkqCU3RkOoj3EeXGB9wqKqyUurKY" /> */}