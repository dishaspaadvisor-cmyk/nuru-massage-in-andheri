"use client";

import { useEffect } from "react";
import gallery from "@/src/data/gallery.json";

const fallbackImage = "/spa-images/spa-gallery-001.jpg";

type GalleryImage = {
  src: string;
  alt: string;
};

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number) {
  let value = seed || 1;
  return () => {
    value += 0x6d2b79f5;
    let mixed = Math.imul(value ^ (value >>> 15), value | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledImages(seed: string) {
  const random = seededRandom(hashSeed(seed));
  const images = [...(gallery as GalleryImage[])];

  for (let index = images.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [images[index], images[swapIndex]] = [images[swapIndex], images[index]];
  }

  return images;
}

function getVisitorSeed() {
  const key = "spa-image-visitor-seed";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const seed = `${Date.now()}-${crypto.randomUUID?.() || Math.random()}`;
  window.localStorage.setItem(key, seed);
  return seed;
}

function imageLooksPersonalizable(image: HTMLImageElement) {
  return image.src.includes("spa-images") || image.srcset.includes("spa-images");
}

export function ImagePersonalizer() {
  useEffect(() => {
    const visitorImages = shuffledImages(getVisitorSeed());

    function applyFallback(image: HTMLImageElement) {
      if (image.dataset.spaFallbackApplied === "true") return;

      image.dataset.spaFallbackApplied = "true";
      image.dataset.personalizedSpaImage = fallbackImage;
      image.srcset = "";
      image.sizes = "";
      image.src = fallbackImage;
      image.alt = image.alt || "Unicorn Spa professional massage and wellness ambience";
    }

    function personalize() {
      const pageImages = Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter(imageLooksPersonalizable);

      pageImages.forEach((image, index) => {
        const replacement = visitorImages[index % visitorImages.length];
        if (!replacement || image.dataset.personalizedSpaImage === replacement.src) {
          return;
        }

        image.dataset.personalizedSpaImage = replacement.src;
        image.srcset = "";
        image.sizes = "";
        image.src = replacement.src;
        image.alt = replacement.alt || image.alt;
      });
    }

    function handleImageError(event: Event) {
      if (event.target instanceof HTMLImageElement && imageLooksPersonalizable(event.target)) {
        applyFallback(event.target);
      }
    }

    personalize();

    const observer = new MutationObserver(() => personalize());
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("error", handleImageError, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("error", handleImageError, true);
    };
  }, []);

  return null;
}
