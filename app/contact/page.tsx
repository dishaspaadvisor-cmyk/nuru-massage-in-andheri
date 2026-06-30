import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/app/components/ContactForm";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { WhatsAppIcon } from "@/app/components/WhatsAppIcon";
import { phoneHref, primaryPhone, primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";

export const metadata: Metadata = {
  title: `Contact ${site.business.businessName}`,
  description: `Call, WhatsApp or visit ${site.business.businessName}, best spa in ${site.business.city}.`
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <div className="contact-layout">
          <div className="contact-panel">
            <p className="eyebrow"><MapPin size={18} /> Contact</p>
            <h1>Book Spa Appointment in {site.business.city}</h1>
            <div className="contact-list">
              <a href={phoneHref(primaryPhone())}><Phone size={20} /> {primaryPhone()}</a>
              <a href={whatsappHref(primaryWhatsapp())}><WhatsAppIcon size={20} /> WhatsApp Booking</a>
              <div><Clock size={20} /> {site.business.workingHours}</div>
              <div><MapPin size={20} /> {site.business.address}</div>
            </div>
            <ContactForm />
          </div>
          <iframe className="map-frame" src={site.business.googleMapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${site.business.businessName} map`} />
        </div>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
