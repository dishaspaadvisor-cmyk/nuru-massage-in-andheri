import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: `Spa Gallery in ${site.business.city}`,
  description: `View all Best, Premium Spa interior, massage room, therapy setup, jacuzzi and wellness ambience images for ${site.business.businessName}.`
};

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <p className="eyebrow"><Sparkles size={18} /> Gallery</p>
        <h1>Best, Premium Spa Gallery in {site.business.city}</h1>
        <p className="section-lead">All {site.gallery.length} local image assets from the project image folder are used here with SEO-friendly alt text.</p>
        <div className="all-gallery-grid">
          {site.gallery.map((image) => (
            <figure className="gallery-card" data-gallery-card key={image.id}>
              <div className="gallery-card-image">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 25vw, 20vw" />
              </div>
              <figcaption><strong>{image.title}</strong><span>{image.category}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
