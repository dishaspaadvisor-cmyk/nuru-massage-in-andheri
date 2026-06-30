"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { phoneHref, primaryPhone, primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function BlogBookingPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("blog-booking-popup-dismissed")) {
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 4500);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.65) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  function close() {
    sessionStorage.setItem("blog-booking-popup-dismissed", "true");
    setVisible(false);
  }

  return (
    <aside className="blog-popup" role="dialog" aria-label="Spa booking offer">
      <button className="blog-popup-close" type="button" onClick={close} aria-label="Close booking popup">
        <X size={18} />
      </button>
      <span>{site.business.announcement}</span>
      <h2>Need a relaxing spa session today?</h2>
      <p>Book your massage appointment on WhatsApp and ask for today&apos;s available slots in {site.business.city}.</p>
      <div className="cta-row">
        <a className="btn secondary" href={whatsappHref(primaryWhatsapp(), "Hello, I read your spa blog and want to book an appointment today.")}>
          <WhatsAppIcon size={18} /> WhatsApp Booking
        </a>
        <a className="btn ghost" href={phoneHref(primaryPhone())}>
          <Phone size={18} /> Call Now
        </a>
      </div>
    </aside>
  );
}
