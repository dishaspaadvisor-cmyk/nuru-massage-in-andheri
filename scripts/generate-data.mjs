import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceImages = path.join(root, "images");
const publicImages = path.join(root, "public", "spa-images");
const dataDir = path.join(root, "src", "data");

fs.rmSync(publicImages, { recursive: true, force: true });
fs.mkdirSync(publicImages, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const categories = [
  "Spa Interior",
  "Massage Room",
  "Therapy Setup",
  "Jacuzzi",
  "Wellness Ambience",
  "Reception",
  "Premium Room",
  "Relaxation Area"
];

const imageFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      imageFiles.push(absolutePath);
    }
  }
}

walk(sourceImages);
imageFiles.sort((a, b) => a.localeCompare(b));

const gallery = imageFiles.map((file, index) => {
  const sourceExtension = path.extname(file).toLowerCase();
  const extension = sourceExtension === ".jpeg" ? ".jpg" : sourceExtension;
  const fileName = `spa-gallery-${String(index + 1).padStart(3, "0")}${extension}`;
  const category = categories[index % categories.length];
  const originalPath = path.relative(sourceImages, file).replaceAll("\\", "/");

  fs.copyFileSync(file, path.join(publicImages, fileName));

  return {
    id: `gallery-${String(index + 1).padStart(3, "0")}`,
    src: `/spa-images/${fileName}`,
    originalPath: `images/${originalPath}`,
    alt: `${category.toLowerCase()} at Best, Premium Spa in Sakinaka, Andheri`,
    title: `${category} ${index + 1}`,
    category,
    caption: `Premium ${category.toLowerCase()} visual for spa and massage in Sakinaka, Andheri.`
  };
});

const business = {
  businessName: "Unicorn Spa",
  logoText: "Unicorn Spa",
  tagline: "Best, Premium Spa & Massage in Sakinaka, Andheri",
  city: "Sakinaka, Andheri",
  area: " Sakinaka, Andheri",
  state: "Maharashtra",
  country: "India",
  address: "Main Road, Sakinaka, Andheri, Maharashtra 414001",
  phone: "+91 90000 00000",
  whatsapp: "+919000000000",
  email: "",
  website: "https://nuru-massage-in-andheri.vercel.app/",
  workingHours: "Open Daily, 10:00 AM - 10:00 PM",
  announcement: "Flat 20% Off on First Spa Session",
  googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Sakinaka, Andheri%20Maharashtra",
  googleMapEmbed: "https://www.google.com/maps?q=Sakinaka, Andheri%20Maharashtra&output=embed",
  nearbyLandmark: "near  market and main road",
  socialLinks: {
    instagram: "#",
    facebook: "#"
  }
};

const serviceNames = [
  ["full-body-massage", "Full Body Massage", "A complete relaxation massage for body refreshment, stress relief and deep comfort."],
  ["thai-massage", "Thai Massage", "Stretch-focused massage therapy for flexibility, body balance and renewed energy."],
  ["deep-tissue-massage", "Deep Tissue Massage", "Firm pressure massage for back, shoulder and muscle stiffness."],
  ["swedish-massage", "Swedish Massage", "Smooth, calming massage therapy for relaxation and better sleep."],
  ["balinese-massage", "Balinese Massage", "Premium massage technique combining gentle stretches and soothing pressure."],
  ["aromatherapy-massage", "Aromatherapy Massage", "Oil-based wellness massage with calming aroma blends."],
  ["hot-stone-massage", "Hot Stone Massage", "Warm stone therapy for deep relaxation and muscle comfort."],
  ["foot-massage", "Foot Massage", "Focused foot therapy for travel fatigue, standing stress and daily tiredness."],
  ["oil-massage", "Oil Massage", "Relaxing oil massage for smooth movement, comfort and freshness."],
  ["couple-spa", "Couple Spa", "Private wellness session for two with a Best, Premium Spa ambience."],
  ["body-scrub", "Body Scrub", "Skin freshness and body polish treatment in a hygienic spa setup."],
  ["jacuzzi-spa", "Jacuzzi Spa", "Premium jacuzzi relaxation experience with wellness-focused ambience."],
  ["potli-massage", "Potli Massage", "Traditional warm compress massage for body comfort and relaxation."],
  ["lomi-lomi-massage", "Lomi Lomi Massage", "Flowing massage strokes for calm, rhythm and deep relaxation."],
  ["ayurvedic-massage", "Ayurvedic Massage", "Wellness-inspired oil massage for balance and body refreshment."],
  ["head-massage", "Head Massage", "Short stress-relief session for head, neck and shoulder comfort."],
  ["back-massage", "Back Massage", "Targeted back massage for stiffness, fatigue and daily stress."],
  ["body-massage-spa-package", "Body Massage Spa Package", "Value wellness package combining popular massage and spa benefits."]
];

const services = serviceNames.map(([slug, name, shortDescription], index) => ({
  id: slug,
  slug,
  name,
  shortTitle: name,
  seoTitle: `${name} in ${business.city} | Premium ${name} Near Me`,
  seoDescription: `Book professional ${name.toLowerCase()} in ${business.city} at ${business.businessName}. Clean private rooms, quick WhatsApp booking and Best, Premium Spa ambience.`,
  keywords: [
    `${name.toLowerCase()} in ${business.city}`,
    `${name.toLowerCase()} near me`,
    `best ${name.toLowerCase()} ${business.city}`,
    `professional massage therapy in ${business.city}`
  ],
  shortDescription,
  longDescription: `${name} at ${business.businessName} is designed for guests searching for a professional spa in ${business.city}, massage near me, body massage in ${business.city}, and premium wellness therapy in a clean and relaxing environment.`,
  benefits: ["Stress relief", "Muscle relaxation", "Better sleep", "Body refreshment"],
  process: ["Quick booking confirmation", "Private room preparation", "Professional wellness session", "Post-session refreshment"],
  whoShouldChoose: ["Guests feeling tired or stressed", "People searching for a trusted spa near me", "Anyone who wants a premium wellness routine"],
  duration: index % 3 === 0 ? "60 Minutes" : index % 3 === 1 ? "75 Minutes" : "90 Minutes",
  price: index % 3 === 0 ? "Starting from ₹1499" : index % 3 === 1 ? "Starting from ₹1999" : "Starting from ₹2499",
  image: gallery[index % gallery.length]?.src || "/spa-images/spa-gallery-001.jpg",
  alt: `${name.toLowerCase()} spa setup in ${business.city}`,
  faqs: [
    {
      question: `Do you offer ${name} in ${business.city}?`,
      answer: `Yes, ${business.businessName} offers ${name.toLowerCase()} in ${business.city} with professional wellness-focused service.`
    },
    {
      question: `How can I book ${name}?`,
      answer: "You can call directly or book on WhatsApp for today's available appointment slots."
    }
  ]
}));

const seo = {
  home: {
    title: `Best Spa in ${business.city} | Premium Massage Near Me | ${business.businessName}`,
    description: `Book Best, Premium Spa and massage in ${business.city}. Full body massage, Thai massage, deep tissue massage, aromatherapy, couple spa, foot massage and wellness services.`,
    canonical: "/",
    ogImage: gallery[0]?.src || "/spa-images/spa-gallery-001.jpg"
  },
  keywords: [
    `spa in ${business.city}`,
    `best spa in ${business.city}`,
    `massage in ${business.city}`,
    "massage near me",
    "spa near me",
    `body massage in ${business.city}`,
    `full body massage in ${business.city}`,
    `deep tissue massage in ${business.city}`,
    `thai massage in ${business.city}`,
    `swedish massage in ${business.city}`,
    `aromatherapy massage in ${business.city}`,
    `balinese massage in ${business.city}`,
    `massage center in ${business.city}`,
    `massage centre in ${business.city}`,
    `spa center in ${business.city}`,
    `spa centre in ${business.city}`,
    `Best, Premium Spa in ${business.city}`,
    `luxury spa in ${business.city}`,
    `wellness spa in ${business.city}`,
    `body massage spa in ${business.city}`,
    `couple spa in ${business.city}`,
    `foot massage in ${business.city}`,
    `oil massage in ${business.city}`,
    `hot stone massage in ${business.city}`,
    `jacuzzi spa in ${business.city}`,
    `spa packages in ${business.city}`,
    "best massage spa near me",
    "best body massage near me",
    `professional massage therapy in ${business.city}`
  ],
  localKeywords: [`spa near ${business.area}`, `massage near ${business.area}`, `spa near Sakinaka, Andheri bus stand`],
  spellingVariants: ["spa ahmednagar", "spa ahilya nagar", "masage near me", "body masage Sakinaka, Andheri", "spa sentre near me"]
};

const testimonials = [
  ["Rohit S.", business.city, 5, `One of the best spa in ${business.city}. Clean room, quick booking and good full body massage experience.`, "Full Body Massage", "2026-06-10"],
  ["Priya M.", business.city, 5, `Professional massage in ${business.city} with premium ambience and hygienic private rooms.`, "Aromatherapy Massage", "2026-06-12"],
  ["Aman K.", business.city, 5, "Very relaxing spa, fast WhatsApp response and transparent pricing.", "Deep Tissue Massage", "2026-06-14"],
  ["Neha R.", business.city, 5, "Clean and relaxing spa near me with a calm wellness setup.", "Foot Massage", "2026-06-18"]
].map(([name, location, rating, review, service, date]) => ({ name, location, rating, review, service, date }));

const faqs = [
  [`Which is the best spa in ${business.city}?`, `${business.businessName} is built as a premium local spa website for people searching for clean rooms, professional massage therapy and easy booking in ${business.city}.`],
  [`Do you offer full body massage in ${business.city}?`, "Yes, full body massage and multiple wellness massage options are available."],
  ["Is appointment required?", "Appointment is recommended. Call or WhatsApp to confirm today's slot."],
  ["Do you offer Thai massage?", "Yes, Thai massage is listed as a professional wellness service."],
  ["Do you offer deep tissue massage?", "Yes, deep tissue massage is available for guests who prefer firm pressure therapy."],
  [`What is the price of massage in ${business.city}?`, "Prices are shown as starting prices in the offer and service sections and can be updated from JSON."],
  [`Is your spa near ${business.area}?`, `The location section targets ${business.area}, nearby landmarks and spa near me searches.`],
  ["How can I book on WhatsApp?", "Tap any WhatsApp Booking button and send the prefilled appointment message."],
  ["Do you have hygienic private rooms?", "The website highlights clean, hygienic and private spa rooms."],
  ["What are your working hours?", business.workingHours]
].map(([question, answer]) => ({ question, answer, keywords: seo.keywords.slice(0, 4) }));

const offers = [
  ["First Visit Offer", "Flat 20% Off", "60 Minutes", ["Full body massage", "Private room", "WhatsApp booking"], "Popular"],
  ["Full Body Massage Package", "Starting from ₹1499", "60 Minutes", ["Full body massage", "Oil therapy", "Relaxation"], "Best Value"],
  ["Couple Spa Package", "Starting from ₹3499", "90 Minutes", ["Couple room", "Aroma therapy", "Premium ambience"], "Premium"],
  ["Deep Tissue Massage Package", "Starting from ₹1999", "75 Minutes", ["Firm pressure", "Back focus", "Muscle relaxation"], "Recommended"],
  ["Thai Massage Package", "Starting from ₹1999", "75 Minutes", ["Thai massage", "Stretching", "Body refreshment"], "Trending"],
  ["Premium Wellness Package", "Starting from ₹4499", "120 Minutes", ["Massage", "Body scrub", "Jacuzzi spa"], "Luxury"]
].map(([title, price, duration, includes, badge]) => ({ title, price, duration, includes, badge, cta: "Book Now" }));

const nearbyAreas = [" Sakinaka, Andheri", "Savedi", "Pipeline Road", "Nagar Pune Road", "MIDC", "Bus Stand Area"].map((area) => ({
  name: area,
  slug: area.toLowerCase().replaceAll(" ", "-"),
  seoTitle: `Spa near ${area} | Massage near me in ${business.city}`,
  seoDescription: `Book Best, Premium Spa and massage near ${area}, ${business.city}.`,
  keywords: [`spa near ${area}`, `massage near ${area}`, `body massage near ${area}`]
}));

const blogs = [
  ["best-spa-in-city-guide", `Best Spa in ${business.city}: Complete Wellness Guide`, `A practical guide to choosing a clean, professional and Best, Premium Spa in ${business.city}.`],
  ["benefits-of-full-body-massage", `Benefits of Full Body Massage in ${business.city}`, "Full body massage can support relaxation, better sleep and body refreshment."],
  ["thai-massage-vs-deep-tissue", "Thai Massage vs Deep Tissue Massage", "Understand the difference between stretch-focused Thai massage and firm-pressure deep tissue massage."],
  ["choose-best-massage-spa-near-me", "How to Choose the Best Massage Spa Near Me", "Look for hygiene, transparent pricing, real service details and easy booking."],
  ["regular-massage-reduce-stress", "Why Regular Massage Therapy Helps Reduce Stress", "Consistent massage therapy can be part of a professional wellness routine."]
].map(([slug, title, excerpt]) => ({
  slug,
  title,
  excerpt,
  date: "2026-06-28",
  content: `${excerpt} ${business.businessName} focuses on clean rooms, professional wellness language, strong local SEO and quick booking for guests in ${business.city}.`
}));

for (const [fileName, payload] of Object.entries({
  "gallery.json": gallery,
  "business.json": business,
  "seo.json": seo,
  "services.json": services,
  "testimonials.json": testimonials,
  "faqs.json": faqs,
  "offers.json": offers,
  "nearbyAreas.json": nearbyAreas,
  "blogs.json": blogs
})) {
  fs.writeFileSync(path.join(dataDir, fileName), `${JSON.stringify(payload, null, 2)}\n`);
}

console.log(`Generated ${gallery.length} gallery images and ${services.length} services.`);
