"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { primaryWhatsapp, site, whatsappHref } from "@/app/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("sending");
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      preferredDate: String(formData.get("preferredDate") || ""),
      message: String(formData.get("message") || ""),
      sourcePath: window.location.pathname
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setStatus("sent");
      const text = `Hello, I want to book a spa appointment.\nName: ${payload.name}\nPhone: ${payload.phone}\nService: ${payload.service}\nDate: ${payload.preferredDate}\nMessage: ${payload.message}`;
      window.location.href = whatsappHref(primaryWhatsapp(), text);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={submit} className="lead-form">
      <div className="form-grid">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" required placeholder="Your phone number" />
        </label>
        <label>
          Service Interested
          <select name="service" defaultValue="">
            <option value="" disabled>
              Select service
            </option>
            {site.services.map((service) => (
              <option value={service.name} key={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Preferred Date
          <input name="preferredDate" type="date" />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" placeholder="Preferred time or service details" rows={4} />
      </label>
      <button className="btn" disabled={status === "sending"} type="submit">
        {status === "sending" ? <Send size={18} /> : <WhatsAppIcon size={18} />}
        {status === "sending" ? "Sending..." : "Submit & Open WhatsApp"}
      </button>
      {status === "sent" && <p className="form-status">Lead saved. Opening WhatsApp booking.</p>}
      {status === "error" && <p className="form-status error">Could not submit. Please call or WhatsApp directly.</p>}
    </form>
  );
}
