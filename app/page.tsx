import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Gift, MapPin, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { QuickCtaStrip, SiteFooter, SiteHeader, StickyCta } from "./components/SiteChrome";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { allKeywords, directionHref, phoneHref, primaryPhone, primaryWhatsapp, site, siteUrl, whatsappHref } from "./lib/site";

const heroImage = site.gallery[0];
const previewGallery = site.gallery.slice(0, 18);
const benefits = ["Stress Relief", "Muscle Relaxation", "Better Sleep", "Improved Blood Circulation", "Body Refreshment", "Mind Relaxation", "Wellness Routine", "Skin Freshness"];
const benefitImages = site.gallery.slice(20, 28);
const whyChoose = ["Professional & trained therapists", "Clean and hygienic rooms", "Best, Premium Spa ambience", "Easy WhatsApp booking", "Affordable spa packages", "Convenient location", "Multiple massage options", "Customer-first service", "Transparent pricing", "Fast response"];
const whyChooseImages = site.gallery.slice(28, 38);
const offerImages = site.gallery.slice(38, 44);

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: site.business.businessName,
    image: site.gallery.map((image) => `${siteUrl}${image.src}`),
    url: siteUrl,
    telephone: primaryPhone(),
    email: site.business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.business.address,
      addressLocality: site.business.city,
      addressRegion: site.business.state,
      addressCountry: site.business.country
    },
    openingHours: "Mo-Su 10:00-22:00",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: site.testimonials.length
    },
    review: site.testimonials.map((item) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: item.rating },
      author: { "@type": "Person", name: item.name },
      reviewBody: item.review
    }))
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function Home() {
  return (
    <main className="page-shell">
      <JsonLd />
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={18} /> Best, Premium Spa Near Me</p>
          <h1>Best, Premium Spa & Massage in {site.business.city}</h1>
          <p>
            Relax, refresh, and recharge with professional massage therapy, full body massage, day spa, Thai massage, deep tissue massage,
            Swedish massage, aromatherapy, Balinese massage, oil massage, foot massage and wellness spa services in {site.business.city}.
          </p>
          <div className="badges">
            {["Professional Therapists", "Hygienic Rooms", "Spa Near Me", "Full Body Massage"].map((badge) => (
              <span className="badge" key={badge}><CheckCircle2 size={16} /> {badge}</span>
            ))}
          </div>
          <div className="cta-row">
            <a className="btn secondary" href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={20} /> Book on WhatsApp</a>
            <a className="btn" href={phoneHref(primaryPhone())}><Phone size={20} /> Call Now</a>
            <a className="btn ghost" href={directionHref()} target="_blank"><MapPin size={20} /> Get Direction</a>
          </div>
        </div>
        <div className="hero-media">
          <Image src={heroImage.src} alt={`Best, Premium Spa room in ${site.business.city}`} fill priority sizes="(max-width: 980px) 100vw, 45vw" />
          <div className="hero-stamp">
            <strong>{site.business.announcement}</strong>
            <span>{site.business.workingHours}</span>
          </div>
        </div>
        <div className="mobile-hero-cta" aria-label="Mobile quick booking actions">
          <a href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={18} /> WA</a>
          <a href={phoneHref(primaryPhone())}><Phone size={18} /> Call</a>
          <a href={directionHref()} target="_blank"><MapPin size={18} /> Direction</a>
        </div>
      </section>

      <QuickCtaStrip />

      <section className="section alt" id="about">
        <div className="about-layout">
          <div>
            <div className="section-head">
              <div>
                <p className="eyebrow"><ShieldCheck size={18} />Best Massage In {site.business.city}</p>
                <h2>Welcome to {site.business.businessName}, Best, Premium Spa in {site.business.city}</h2>
              </div>
            </div>
            <p className="section-lead">
              {site.business.businessName} is designed for people searching for spa in {site.business.city}, massage in {site.business.city}, body massage in {site.business.city}, massage therapy in {site.business.city}, full body massage in {site.business.city}, oil massage in {site.business.city}, best massage in {site.business.city}, spa near me, massage near me, Swedish massage in {site.business.city}, deep tissue massage in {site.business.city}, aromatherapy massage in {site.business.city}, couples massage in {site.business.city}, therapeutic massage in {site.business.city}, wellness spa in {site.business.city}, Thai massage in {site.business.city}, lomi lomi massage in {site.business.city}, hot stone massage in {site.business.city}, Balinese massage in {site.business.city}, foot massage in {site.business.city}, head massage in {site.business.city}, back massage in {site.business.city}, body scrub in {site.business.city}, jacuzzi spa in {site.business.city}, spa packages in {site.business.city}, spa near Sakinaka Metro Station, spa near Saki Vihar Road, spa near Andheri East and massage near Marol Naka. We focus on premium ambience, hygienic setup, relaxing rooms, trained therapists, easy booking, clear pricing and a convenient location.
            </p>
          </div>
          <div className="about-image">
            <Image
              src={site.gallery[12].src}
              alt={`Best, Premium Spa ambience and wellness setup in ${site.business.city}`}
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
            />
            <div className="about-image-label">
              <strong>Premium Wellness Ambience</strong>
              <span>{site.business.city} Spa Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-head">
          <div>
            <p className="eyebrow"><Sparkles size={18} /> Services</p>
            <h2>Massage Services With Local SEO Pages</h2>
          </div>
          <Link className="btn" href="/services">View All Services</Link>
        </div>
        <div className="service-grid">
          {site.services.map((service) => (
            <article className="service-card" id={service.slug} key={service.slug}>
              <div className="service-image">
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 980px) 50vw, 33vw" />
              </div>
              <div className="service-body">
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <div className="service-meta"><span>{service.duration}</span><strong>{service.price}</strong></div>
                <div className="mini-keywords">
                  {service.keywords.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}
                </div>
                <div className="cta-row" style={{ marginTop: 16 }}>
                  <Link className="btn ghost" href={`/services/${service.slug}`}>Details</Link>
                  <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I want to book ${service.name}.`)}><WhatsAppIcon size={17} /> Book</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head"><div><p className="eyebrow"><Star size={18} /> Benefits</p><h2>Wellness Benefits Clients Search For</h2></div></div>
        <div className="benefit-grid">
          {benefits.map((item, index) => (
            <div className="benefit benefit-with-image" key={item}>
              <div className="benefit-image">
                <Image
                  src={benefitImages[index % benefitImages.length].src}
                  alt={`${item.toLowerCase()} benefit at Best, Premium Spa in ${site.business.city}`}
                  fill
                  sizes="(max-width: 980px) 50vw, 25vw"
                />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="eyebrow"><CheckCircle2 size={18} /> Why Choose Us</p><h2>Built For Trust, Calls And WhatsApp Booking</h2></div></div>
        <div className="benefit-grid">
          {whyChoose.map((item, index) => (
            <div className="benefit benefit-with-image" key={item}>
              <div className="benefit-image">
                <Image
                  src={whyChooseImages[index % whyChooseImages.length].src}
                  alt={`${item.toLowerCase()} at trusted spa in ${site.business.city}`}
                  fill
                  sizes="(max-width: 980px) 50vw, 25vw"
                />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="offers">
        <div className="section-head">
          <div><p className="eyebrow"><Gift size={18} /> Offers</p><h2>Spa Packages And Booking Offers</h2></div>
          <Link className="btn" href="/offers">All Offers</Link>
        </div>
        <div className="offer-grid">
          {site.offers.map((offer, index) => (
            <article className="offer-card" data-offer-card key={offer.title}>
              <div className="offer-image">
                <Image
                  src={offerImages[index % offerImages.length].src}
                  alt={`${offer.title.toLowerCase()} spa offer in ${site.business.city}`}
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                />
              </div>
              <span>{offer.badge}</span>
              <h3>{offer.title}</h3>
              <strong>{offer.price}</strong>
              <p>{offer.duration}</p>
              <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), `Hello, I want ${offer.title}.`)}>{offer.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="section-head">
          <div><p className="eyebrow"><Sparkles size={18} /> Gallery</p><h2>Best, Premium Spa Gallery</h2></div>
          <Link className="btn" href="/gallery">View All {site.gallery.length} Images</Link>
        </div>
        <div className="gallery-grid gallery-preview">
          {previewGallery.map((image) => (
            <Link data-gallery-card className="gallery-tile" href="/gallery" key={image.id}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 980px) 50vw, 25vw" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section alt" id="testimonials">
        <div className="section-head"><div><p className="eyebrow"><Star size={18} /> Testimonials</p><h2>Reviews That Build Local Trust</h2></div></div>
        <div className="testimonial-grid">
          {site.testimonials.map((item) => (
            <article className="testimonial" key={item.name}>
              <strong>{item.name} - {item.location}</strong>
              <p>{"*".repeat(item.rating)} {item.review}</p>
              <span>{item.service} - {item.date}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-head"><div><p className="eyebrow"><CheckCircle2 size={18} /> FAQ</p><h2>Spa Booking Questions</h2></div></div>
        <div className="faq-grid">
          {site.faqs.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
        </div>
      </section>

      <section className="section alt" id="contact">
        <div className="contact-layout">
          <div className="contact-panel">
            <p className="eyebrow"><MapPin size={18} /> Spa Near {site.business.area}</p>
            <h2>Contact, Location And Booking</h2>
            <div className="contact-list">
              <a href={phoneHref(primaryPhone())}><Phone size={20} /> {primaryPhone()}</a>
              <a href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={20} /> WhatsApp Booking</a>
              <div><Clock size={20} /> {site.business.workingHours}</div>
              <div><MapPin size={20} /> {site.business.address}</div>
            </div>
            <p className="seo-text">Nearby areas served: {site.nearbyAreas.map((area) => area.name).join(", ")}. Parking and landmark details can be updated from JSON.</p>
            <ContactForm />
          </div>
          <iframe className="map-frame" src={site.business.googleMapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${site.business.businessName} map`} />
        </div>
      </section>

      <section className="section">
        <p className="seo-text">{allKeywords.join(" | ")}</p>
      </section>

      <SiteFooter />
      <StickyCta />
    </main>
  );
}
