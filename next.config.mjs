const defaultCanonicalUrl = "https://longevityleak.com";
const configuredCanonicalUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultCanonicalUrl;

function getCanonicalOrigin(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    parsed.hostname = parsed.hostname.replace(/^www\./i, "");
    parsed.pathname = "";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return defaultCanonicalUrl;
  }
}

const canonicalOrigin = getCanonicalOrigin(configuredCanonicalUrl);
const canonicalHost = new URL(canonicalOrigin).host;
const wwwHost = `www.${canonicalHost}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: wwwHost }],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true
      }
    ];
  }
};

export default nextConfig;
