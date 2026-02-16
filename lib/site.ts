const DEFAULT_SITE_URL = "https://longevityleak.com";

function normalizeCanonicalSiteUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    parsed.hostname = parsed.hostname.replace(/^www\./i, "");
    parsed.pathname = "";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export const siteConfig = {
  name: "Longevity Leak",
  title: "Longevity Leak - Clinical Studies. Zero Jargon.",
  description: "Clinical studies. Zero jargon. The stuff that actually works.",
  url: normalizeCanonicalSiteUrl(configuredSiteUrl),
  author: "Longevity Leak",
  features: {
    clinics: false
  }
};
