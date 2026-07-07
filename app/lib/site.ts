import blogs from "@/src/data/blogs.json";
import business from "@/src/data/business.json";
import faqs from "@/src/data/faqs.json";
import gallery from "@/src/data/gallery.json";
import nearbyAreas from "@/src/data/nearbyAreas.json";
import offers from "@/src/data/offers.json";
import seo from "@/src/data/seo.json";
import services from "@/src/data/services.json";
import testimonials from "@/src/data/testimonials.json";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || business.website || "https://whitesmoke-albatross-419929.hostingersite.com"
).replace(/\/$/, "");

export const site = {
  business,
  seo,
  services,
  gallery,
  testimonials,
  faqs,
  offers,
  nearbyAreas,
  blogs
};

export const allKeywords = [
  ...seo.keywords,
  ...seo.localKeywords,
  ...seo.spellingVariants,
  ...services.flatMap((service) => service.keywords)
];

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string, text = "Hello, I want to book a spa appointment.") {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
}

export function directionHref() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAP_URL || business.googleMapUrl;
}

export function primaryPhone() {
  return process.env.NEXT_PUBLIC_PHONE_NUMBER || business.phone;
}

export function primaryWhatsapp() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || business.whatsapp;
}
