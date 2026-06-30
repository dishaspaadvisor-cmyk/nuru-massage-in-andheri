import type { Metadata } from "next";
import Image from "next/image";
import { Gift } from "lucide-react";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";

export const metadata: Metadata = {
  title: `Best Spa Offers & Massage Packages in ${site.business.city} | Special Discounts`,
  description: `Get premium spa deals and massage offers in ${site.business.city}. Book full body massage, Thai, deep tissue, Swedish, oil massage, foot massage and couple spa packages with quick WhatsApp booking.`,
  keywords: [
    `spa offers in ${site.business.city}`,
    `massage offers in ${site.business.city}`,
    `spa packages in ${site.business.city}`,
    `cheap massage in ${site.business.city}`,
    `affordable spa near me`,
    `spa price in ${site.business.city}`,
    `massage rates in ${site.business.city}`,
    `couple spa deals in ${site.business.city}`,
    `best massage deals near me`,
    `full body massage price ${site.business.city}`,
    `spa near Sakinaka Metro Station`,
    `massage near Saki Vihar Road`
  ],
  alternates: {
    canonical: "/offers"
  }
};
export default function OffersPage() {
  const offerImages = site.gallery.slice(38, 44);

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <p className="eyebrow"><Gift size={18} /> Offers</p>
        <h1>Spa Packages & Offers in {site.business.city}</h1>
        <div className="offer-grid" style={{ marginTop: 28 }}>
          {site.offers.map((offer, index) => (
            <article className="offer-card" data-offer-card key={offer.title}>
              <div className="offer-image">
                <Image
                  src={offerImages[index % offerImages.length].src}
                  alt={`${offer.title.toLowerCase()} spa package in ${site.business.city}`}
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                />
              </div>
              <span>{offer.badge}</span>
              <h2>{offer.title}</h2>
              <strong>{offer.price}</strong>
              <p>{offer.duration}</p>
              <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I want ${offer.title}.`)}>{offer.cta}</a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
