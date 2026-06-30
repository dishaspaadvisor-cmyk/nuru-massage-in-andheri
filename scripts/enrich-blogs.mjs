import fs from "node:fs";

const filePath = "src/data/blogs.json";
const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

const areaKeywords = [
  "spa near Savedi Sakinaka, Andheri",
  "massage near Savedi",
  "spa near Pipeline Road Sakinaka, Andheri",
  "massage near Pipeline Road",
  "spa near Sakinaka, Andheri bus stand",
  "massage near  Sakinaka, Andheri",
  "spa near Nagar Pune Road",
  "spa near MIDC Sakinaka, Andheri",
  "massage center near me Sakinaka, Andheri",
  "massage centre near me Sakinaka, Andheri",
  "spa center in Sakinaka, Andheri",
  "spa centre in Sakinaka, Andheri",
  "best spa near me Sakinaka, Andheri",
  "body massage near me Sakinaka, Andheri",
  "same day spa booking Sakinaka, Andheri",
  "private spa room Sakinaka, Andheri",
  "Best, Premium Spa package Sakinaka, Andheri",
  "luxury massage spa Sakinaka, Andheri",
  "spa ahmednagar",
  "spa ahilya nagar"
];

const serviceSets = [
  ["best spa in Sakinaka, Andheri", "Best, Premium Spa in Sakinaka, Andheri", "luxury spa in Sakinaka, Andheri", "wellness spa Sakinaka, Andheri"],
  ["massage near me", "body massage near me", "massage in Sakinaka, Andheri", "professional massage therapy Sakinaka, Andheri"],
  ["full body massage Sakinaka, Andheri", "body massage spa Sakinaka, Andheri", "oil massage Sakinaka, Andheri", "relaxation massage Sakinaka, Andheri"],
  ["Thai massage Sakinaka, Andheri", "deep tissue massage Sakinaka, Andheri", "Swedish massage Sakinaka, Andheri", "Balinese massage Sakinaka, Andheri"],
  ["best massage spa near me", "trusted spa near me", "clean spa near me", "private room spa near me"],
  ["aromatherapy massage Sakinaka, Andheri", "aroma oil massage Sakinaka, Andheri", "premium oil massage Sakinaka, Andheri", "relaxation spa Sakinaka, Andheri"],
  ["couple spa Sakinaka, Andheri", "couple massage spa Sakinaka, Andheri", "spa packages Sakinaka, Andheri", "luxury couple spa Sakinaka, Andheri"],
  ["foot massage Sakinaka, Andheri", "head massage Sakinaka, Andheri", "back massage Sakinaka, Andheri", "quick massage Sakinaka, Andheri"],
  ["massage price Sakinaka, Andheri", "spa offers Sakinaka, Andheri", "affordable spa Sakinaka, Andheri", "premium wellness package Sakinaka, Andheri"],
  ["hygienic spa Sakinaka, Andheri", "clean private spa room Sakinaka, Andheri", "trusted massage center Sakinaka, Andheri", "professional therapists Sakinaka, Andheri"]
];

const updatedBlogs = blogs.map((blog, index) => {
  const keywords = [...new Set([...(blog.keywords || []), ...serviceSets[index % serviceSets.length], ...areaKeywords])];
  return {
    ...blog,
    keywords,
    localSeoText: `This guide supports local searches including ${keywords.slice(0, 12).join(", ")}. ${blog.content}`
  };
});

fs.writeFileSync(filePath, `${JSON.stringify(updatedBlogs, null, 2)}\n`);

console.log(
  updatedBlogs.map((blog) => ({
    slug: blog.slug,
    keywordCount: blog.keywords.length
  }))
);
