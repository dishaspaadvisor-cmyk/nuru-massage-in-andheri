import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Sparkles } from "lucide-react";
import { BlogBookingPopup } from "@/app/components/BlogBookingPopup";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { WhatsAppIcon } from "@/app/components/WhatsAppIcon";
import { directionHref, phoneHref, primaryPhone, primaryWhatsapp, site, siteUrl, whatsappHref } from "@/app/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = site.blogs.find((item) => item.slug === slug);
  return {
    title: blog?.title,
    description: blog?.excerpt,
    keywords: blog?.keywords,
    alternates: blog ? { canonical: `/blogs/${blog.slug}` } : undefined,
    openGraph: blog
      ? {
          title: blog.title,
          description: blog.excerpt,
          url: `${siteUrl}/blogs/${blog.slug}`,
          images: [blog.image]
        }
      : undefined
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = site.blogs.find((item) => item.slug === slug) || site.blogs[0];

  return (
    <main className="page-shell">
      <SiteHeader />
      <article className="section article-page">
        <Link className="eyebrow" href="/blogs"><ArrowLeft size={18} /> Blogs</Link>
        <h1>{blog.title}</h1>
        <p className="section-lead">{blog.excerpt}</p>
        <div className="article-image">
          <Image src={blog.image} alt={blog.alt} fill priority sizes="(max-width: 980px) 100vw, 900px" />
        </div>
        <div className="local-keyword-cloud">
          {blog.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <p>{blog.localSeoText || blog.content}</p>
        <div className="blog-cta-panel article-cta">
          <div>
            <span>Fast Booking CTA</span>
            <h2>Want this spa experience today?</h2>
            <p>Book on WhatsApp for available massage slots, current offers and directions to {site.business.businessName}.</p>
          </div>
          <div className="cta-row">
            <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I read ${blog.title} and want to book a spa appointment.`)}>
              <WhatsAppIcon size={18} /> WhatsApp Booking
            </a>
            <a className="btn" href={phoneHref(primaryPhone())}>
              <Phone size={18} /> Call Now
            </a>
            <a className="btn ghost" href={directionHref()} target="_blank">
              <MapPin size={18} /> Get Direction
            </a>
          </div>
        </div>
        <p>
          For booking support, explore our <Link href="/services">spa services</Link> or contact {site.business.businessName} directly on WhatsApp.
        </p>
        <p className="eyebrow"><Sparkles size={18} /> Professional wellness content only</p>
      </article>
      <BlogBookingPopup />
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
