import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        ink: "#160b0b",
        cream: "#fff8f1",
        gold: "#c18a39",
        luxury: "#9d1f24"
      }
    }
  },
  plugins: []
};

export default config;
