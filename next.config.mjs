/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "longevity-leak.vercel.app" }],
        destination: "https://longevityleak.com/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.longevityleak.com" }],
        destination: "https://longevityleak.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
