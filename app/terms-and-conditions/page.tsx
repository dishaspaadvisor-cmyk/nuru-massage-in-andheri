import type { Metadata } from "next";
import { SiteFooter, SiteHeader, StickyCta } from "@/app/components/SiteChrome";
import { site } from "@/app/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions", description: `Terms and conditions for ${site.business.businessName}.` };

export default function TermsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section article-page">
        <h1>Terms and Conditions</h1>
        <p>All services mentioned on this website are professional wellness, relaxation, beauty and spa services only. Appointment availability, prices and offers can change and should be confirmed by phone or WhatsApp before visiting.</p>
        <p>Users should provide accurate contact details when submitting booking requests.</p>
      </section>
      <SiteFooter />
      <StickyCta />
    </main>
  );
}
