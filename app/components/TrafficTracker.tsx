"use client";

import { useEffect } from "react";

function track(eventType: "whatsapp_click" | "phone_click" | "direction_click", href: string, label: string) {
  return fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType,
      path: window.location.pathname,
      href,
      label
    }),
    keepalive: true
  }).catch(() => {
    // Analytics must never block the page experience.
  });
}

export function TrafficTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const label = link.textContent?.replace(/\s+/g, " ").trim() || href;
      if (href.startsWith("tel:")) track("phone_click", href, label);
      if (href.includes("wa.me")) track("whatsapp_click", href, label);
      if (href.includes("google.com/maps")) track("direction_click", href, label);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
