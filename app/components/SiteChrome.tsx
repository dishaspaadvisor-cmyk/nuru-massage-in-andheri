import Link from "next/link";
import { CalendarCheck, MapPin, Menu, Phone } from "lucide-react";
import { allKeywords, directionHref, phoneHref, primaryPhone, primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <span>{site.business.announcement}</span>
      <a href={phoneHref(primaryPhone())}><Phone size={15} /> {primaryPhone()}</a>
      <a href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={15} /> WhatsApp</a>
      <span><MapPin size={15} /> {site.business.area}</span>
    </div>
  );
}

export function SiteHeader() {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Gallery", "/gallery"],
    ["Offers", "/offers"],
    ["Testimonials", "/#testimonials"],
    ["FAQ", "/#faq"],
    ["Contact", "/contact"]
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="topbar">
        <Link className="brand" href="/">
          {site.business.logoText}
          <span>{site.business.tagline}</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="top-actions">
          <a className="btn ghost-dark mobile-menu" href="#footer-nav" aria-label="Open footer menu">
            <Menu size={18} />
          </a>
          <a className="btn secondary" href={whatsappHref(primaryWhatsapp())}>
            <WhatsAppIcon size={18} /> WhatsApp Booking
          </a>
          <a className="btn" href={phoneHref(primaryPhone())}>
            <Phone size={18} /> Call Now
          </a>
        </div>
      </header>
    </>
  );
}

export function QuickCtaStrip() {
  return (
    <section className="quick-strip">
      <a href={phoneHref(primaryPhone())}><Phone size={18} /> Call Now</a>
      <a href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={18} /> WhatsApp</a>
      <a href={directionHref()} target="_blank"><MapPin size={18} /> Get Direction</a>
      <Link href="/services"><CalendarCheck size={18} /> View Services</Link>
    </section>
  );
}

export function StickyCta() {
  return (
    <div className="floating-actions" aria-label="Quick booking actions">
      <a className="btn secondary" href={whatsappHref(primaryWhatsapp())}>
        <WhatsAppIcon size={18} /> WhatsApp
      </a>
      <a className="btn" href={phoneHref(primaryPhone())}>
        <Phone size={18} /> Call
      </a>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer" id="footer-nav">
      <div>
        <Link className="brand" href="/">
          {site.business.businessName}
          <span>{site.business.tagline}</span>
        </Link>
        <p className="seo-text">
          {site.business.businessName} is designed for people searching for premium spa in {site.business.city}, massage in {site.business.city}, and full body massage in {site.business.city}. Whether you are looking for Thai massage, deep tissue massage, Swedish massage, aromatherapy, Balinese massage, oil massage, foot massage, couple spa, body scrub or jacuzzi spa, we keep the experience professional, hygienic and easy to book. As a local spa near Sakinaka Metro Station and Saki Vihar Road, we focus on premium ambience, relaxing rooms, trained therapists, clear pricing, fast WhatsApp booking and a convenient Andheri East location.
        </p>
      </div>
      <div>
        <h3>Services</h3>
        {site.services.slice(0, 50).map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            {service.name}
          </Link>
        ))}
      </div>
      <div>
        <h3>Sitemap</h3>
        {["/about", "/services", "/gallery", "/offers", "/contact", "/blogs", "/privacy-policy", "/terms-and-conditions"].map((href) => (
          <Link key={href} href={href}>
            {href.replace("/", "").replaceAll("-", " ") || "home"}
          </Link>
        ))}
      </div>
      <div>
        <h3>Contact</h3>
        <a href={phoneHref(primaryPhone())}>{primaryPhone()}</a>
        <a href={whatsappHref(primaryWhatsapp())}>WhatsApp Booking</a>
        <span>{site.business.email}</span>
        <span>{site.business.address}</span>
        <span>{site.business.workingHours}</span>
      </div>
      <p className="footer-keywords">{allKeywords.slice(0, 28).join(" | ")}</p>
      <p className="copyright">Copyright 2026 {site.business.businessName}. All rights reserved.</p>
    </footer>
  );
}
