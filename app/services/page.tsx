import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { WhatsAppIcon } from "@/app/components/WhatsAppIcon";
import { primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";
export const metadata: Metadata = {
  title: `Spa & Massage Services in ${site.business.city} | Full Body Massage Near Me`,
  description: `Top-rated spa in ${site.business.city}. Book premium full body massage, deep tissue, Thai, Swedish, oil massage, foot massage, couples spa and wellness packages with trained therapists in a hygienic setup.`,
  keywords: [
    `spa in ${site.business.city}`,
    `massage in ${site.business.city}`,
    `body massage in ${site.business.city}`,
    `full body massage in ${site.business.city}`,
    `massage near me`,
    `spa near me`,
    `best spa in ${site.business.city}`,
    `deep tissue massage in ${site.business.city}`,
    `thai massage in ${site.business.city}`,
    `swedish massage in ${site.business.city}`,
    `aromatherapy massage in ${site.business.city}`,
    `couple spa in ${site.business.city}`,
    `oil massage in ${site.business.city}`,
    `foot massage in ${site.business.city}`,
    `spa near Sakinaka Metro Station`,
    `massage near Saki Vihar Road`,
    `massage center in ${site.business.city}`,
    `unisex spa near me`
  ],
  alternates: {
    canonical: "/services"
  }
};
export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <p className="eyebrow"><Sparkles size={18} /> Services</p>
        <h1>Massage & Spa Services in {site.business.city}</h1>
        <div className="service-grid" style={{ marginTop: 28 }}>
          {site.services.map((service) => (
            <article className="service-card" key={service.slug}>
              <div className="service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 980px) 50vw, 33vw" /></div>
              <div className="service-body">
                <h2>{service.name}</h2>
                <p>{service.shortDescription}</p>
                <div className="service-meta"><span>{service.duration}</span><strong>{service.price}</strong></div>
                <div className="cta-row" style={{ marginTop: 16 }}>
                  <Link className="btn ghost" href={`/services/${service.slug}`}>Details</Link>
                  <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I want to book ${service.name}.`)}><WhatsAppIcon size={17} /> Book</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
