import type { Metadata } from "next";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { site } from "@/app/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `Privacy policy for ${site.business.businessName}.` };

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section article-page">
        <h1>Privacy Policy</h1>
        <p>We collect contact details submitted through the booking form and basic analytics events to improve website performance, booking flow and local SEO. IP addresses are hashed in analytics events where available.</p>
        <p>Contact details are used only for appointment communication and service follow-up.</p>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
