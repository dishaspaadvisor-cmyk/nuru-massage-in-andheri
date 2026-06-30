import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: `About ${site.business.businessName} | Best Spa & Massage Center in ${site.business.city}`,
  description: `Discover ${site.business.businessName}, a premium wellness spa in ${site.business.city}. Learn about our hygienic setup, trained therapists, full body massage, deep tissue, Thai, Swedish, aromatherapy and wellness packages near Sakinaka Metro Station.`,
  keywords: [
    `about ${site.business.businessName.toLowerCase()}`,
    `best spa in ${site.business.city}`,
    `massage center in ${site.business.city}`,
    `premium massage near me`,
    `professional wellness spa ${site.business.city}`,
    `full body massage in ${site.business.city}`,
    `thai massage in ${site.business.city}`,
    `deep tissue massage in ${site.business.city}`,
    `spa near Sakinaka Metro Station`,
    `massage near Saki Vihar Road`,
    `spa near me`,
    `massage near me`
  ],
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <p className="eyebrow"><ShieldCheck size={18} /> About</p>
        <h1>Best, Premium Spa in {site.business.city}</h1>
        <p className="section-lead">
          {site.business.businessName} is built for people looking for a clean, professional and premium wellness spa in {site.business.city}.
          The site focuses on natural local SEO, transparent service information, fast WhatsApp booking and trust-building content.
        </p>
        <div className="benefit-grid" style={{ marginTop: 28 }}>
          {["Premium ambience", "Hygienic setup", "Trained therapists", "Easy booking", " location", "Professional wellness language", "Transparent pricing", "Local SEO structure"].map((item) => <div className="benefit" key={item}>{item}</div>)}
        </div>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
