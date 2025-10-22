"use client";
import { useEffect } from "react";

export default function DynamicHead({
  title,
  description,
  keywords,
  imageUrl,
  url,
}) {
  useEffect(() => {
    // TITLE
    if (title) document.title = title;

    // DESCRIPTION
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.name = "description";
      document.head.appendChild(descTag);
    }
    descTag.content = description || "";

    // KEYWORDS
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement("meta");
      keywordsTag.name = "keywords";
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.content = keywords || "";

    // OG / Twitter Tags
    const ogTags = {
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:url": url,
      "og:image": imageUrl,
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": imageUrl,
    };

    Object.entries(ogTags).forEach(([key, value]) => {
      if (!value) return;
      let tag = document.querySelector(
        `meta[property="${key}"], meta[name="${key}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        if (key.startsWith("og:")) tag.setAttribute("property", key);
        else tag.setAttribute("name", key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    });
  }, [title, description, keywords, imageUrl, url]);

  return null;
}
