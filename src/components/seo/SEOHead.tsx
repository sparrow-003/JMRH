import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://jmrh.lovable.app";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/z6n6yRQR3COHl1C465nlg0EUjOx2/social-images/social-1770267666512-OIP.webp";

const SEOHead = ({ title, description, keywords, canonical, ogType = "website", jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta helpers
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("property", "og:url", canonical ? `${BASE_URL}${canonical}` : BASE_URL);
    setMeta("property", "og:site_name", "JMRH - Journal of Multidisciplinary Research Horizon");

    // Twitter
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", DEFAULT_IMAGE);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical ? `${BASE_URL}${canonical}` : BASE_URL);

    // JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo="jsonld"]');
    existingScripts.forEach(s => s.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach(item => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "jsonld");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo="jsonld"]');
      scripts.forEach(s => s.remove());
    };
  }, [title, description, keywords, canonical, ogType, jsonLd]);

  return null;
};

export default SEOHead;
