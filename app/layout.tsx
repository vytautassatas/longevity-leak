import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Longevity Leak"
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

const themeBootScript = `(function(){try{var k='longevity-leak-theme';var s=localStorage.getItem(k);var t=(s==='dark'||s==='light')?s:'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
const gaTrackingId = "G-70H3SNFE1W";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaTrackingId}');`}
        </Script>
        <style>{`:root{color-scheme:dark;} :root[data-theme=light]{color-scheme:light;} body{margin:0}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
