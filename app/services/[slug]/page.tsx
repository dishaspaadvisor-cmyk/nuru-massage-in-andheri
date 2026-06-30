import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { QuickCtaStrip, SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { WhatsAppIcon } from "@/app/components/WhatsAppIcon";
import { directionHref, phoneHref, primaryPhone, primaryWhatsapp, site, siteUrl, whatsappHref } from "@/app/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return site.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `${siteUrl}/services/${service.slug}`,
      images: [service.image]
    }
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = site.services.find((item) => item.slug === slug) || site.services[0];
  const related = site.services.filter((item) => item.slug !== service.slug).slice(0, 6);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.seoDescription,
      provider: {
        "@type": "HealthAndBeautyBusiness",
        name: site.business.businessName,
        telephone: primaryPhone(),
        address: site.business.address
      },
      areaServed: site.business.city,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: service.price.replace(/[^\d]/g, "") || undefined,
        availability: "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}/services/${service.slug}` }
      ]
    }
  ];

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <section className="hero">
        <div className="hero-copy">
          <Link className="eyebrow" href="/services"><ArrowLeft size={18} /> All Services</Link>
          <h1>{service.name} in {site.business.city}</h1>
          <p>{service.longDescription}</p>
          <div className="badges">
            {service.keywords.map((keyword) => <span className="badge" key={keyword}><Sparkles size={16} /> {keyword}</span>)}
          </div>
          <div className="cta-row">
            <a className="btn" href={phoneHref(primaryPhone())}><Phone size={20} /> Call For Booking</a>
            <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I want to book ${service.name}.`)}><WhatsAppIcon size={20} /> WhatsApp Now</a>
            <a className="btn ghost" href={directionHref()} target="_blank"><MapPin size={20} /> Get Direction</a>
          </div>
        </div>
        <div className="hero-media">
          <Image src={service.image} alt={service.alt} fill priority sizes="(max-width: 980px) 100vw, 45vw" />
          <div className="hero-stamp"><strong>{service.price}</strong><span>{service.duration}</span></div>
        </div>
      </section>
      <QuickCtaStrip />

      <section className="section alt">
        <div className="section-head"><div><p className="eyebrow"><CheckCircle2 size={18} /> Benefits</p><h2>Why Choose {service.name}</h2></div></div>
        <div className="benefit-grid">{service.benefits.map((item) => <div className="benefit" key={item}>{item}</div>)}</div>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="eyebrow"><Sparkles size={18} /> Process</p><h2>Professional Spa Process</h2></div></div>
        <div className="benefit-grid">{service.process.map((item) => <div className="benefit" key={item}>{item}</div>)}</div>
      </section>

      <section className="section alt">
        <div className="section-head"><div><p className="eyebrow"><CheckCircle2 size={18} /> Best For</p><h2>Who Should Choose This Service</h2></div></div>
        <div className="benefit-grid">{service.whoShouldChoose.map((item) => <div className="benefit" key={item}>{item}</div>)}</div>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="eyebrow"><CheckCircle2 size={18} /> FAQ</p><h2>{service.name} Questions</h2></div></div>
        <div className="faq-grid">{service.faqs.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div>
      </section>

      <section className="section alt">
        <div className="section-head"><div><p className="eyebrow"><Sparkles size={18} /> Related Services</p><h2>More Massage Services in {site.business.city}</h2></div></div>
        <div className="service-grid">
          {related.map((item) => (
            <article className="service-card" key={item.slug}>
              <div className="service-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 980px) 50vw, 33vw" /></div>
              <div className="service-body"><h3>{item.name}</h3><p>{item.shortDescription}</p><Link className="btn ghost" href={`/services/${item.slug}`}>View Details</Link></div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <StickyCta />
    </main>
  );
}
