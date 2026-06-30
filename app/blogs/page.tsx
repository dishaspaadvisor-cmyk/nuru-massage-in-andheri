import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { WhatsAppIcon } from "@/app/components/WhatsAppIcon";
import { phoneHref, primaryPhone, primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";

export const metadata: Metadata = {
  title: `Spa Wellness Blogs & Massage Guides in ${site.business.city}`,
  description: `Read the latest wellness guides, health tips, and massage therapy blogs from ${site.business.businessName}. Discover the benefits of full body massage, Thai stretching, deep tissue relief, and trending wellness treatments in ${site.business.city}.`,
  keywords: [
    `spa wellness blogs in ${site.business.city}`,
    `massage therapy guides ${site.business.city}`,
    `benefits of full body massage`,
    `spa and wellness tips ${site.business.city}`,
    `deep tissue massage vs swedish massage`,
    `thai massage vs deep tissue massage`,
    `aromatherapy massage guide`,
    `best massage techniques for stress relief`,
    `spa near Sakinaka Metro Station`,
    `massage near Saki Vihar Road`,
    `local wellness articles ${site.business.city}`,
    `health and relaxation blogs near me`
  ],
  alternates: {
    canonical: "/blogs"
  }
};

export default function BlogsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <p className="eyebrow"><Sparkles size={18} /> Blogs</p>
        <h1>Spa & Massage Guides</h1>
        <div className="blog-cta-panel">
          <div>
            <span>{site.business.announcement}</span>
            <h2>Reading before booking? Get today&apos;s spa slot now.</h2>
            <p>Call or WhatsApp for full body massage, Thai massage, deep tissue massage and Best, Premium Spa packages in {site.business.city}.</p>
          </div>
          <div className="cta-row">
            <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), "Hello, I want to book a spa appointment after reading your blog.")}>
              <WhatsAppIcon size={18} /> WhatsApp Booking
            </a>
            <a className="btn" href={phoneHref(primaryPhone())}>Call Now</a>
          </div>
        </div>
        <div className="blog-grid">
          {site.blogs.map((blog) => (
            <article className="blog-card" key={blog.slug}>
              <div className="blog-image">
                <Image src={blog.image} alt={blog.alt} fill sizes="(max-width: 980px) 50vw, 33vw" />
              </div>
              <span>{blog.date}</span>
              <h2>{blog.title}</h2>
              <p>{blog.excerpt}</p>
              <div className="mini-keywords">
                {blog.keywords.slice(0, 6).map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
              <div className="cta-row">
                <Link className="btn ghost" href={`/blogs/${blog.slug}`}>Read Guide</Link>
                <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I read ${blog.title} and want to book a spa appointment.`)}>
                  <WhatsAppIcon size={17} /> Book
                </a>
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
