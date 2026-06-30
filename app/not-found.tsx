import Link from "next/link";
import { SiteHeader } from "./components/SiteChrome";

export default function NotFound() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section">
        <h1>Page Not Found</h1>
        <p className="section-lead">This spa page is not available. Explore services or return to the homepage.</p>
        <div className="cta-row">
          <Link className="btn" href="/">Home</Link>
          <Link className="btn secondary" href="/services">Services</Link>
        </div>
      </section>
    </main>
  );
}
