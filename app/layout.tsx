import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans, Geist } from "next/font/google";
import StoreLayoutWrapper from "@/components/StoreLayoutWrapper";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

/**
 * Server Component: Root application layout providing luxury typography with Cinzel
 * and Plus Jakarta Sans (guaranteeing modern lining figures), StoreLayoutWrapper, and global SEO metadata.
 */

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ffzever.com"),
  title: {
    default: "Faraz Faheem | Handcrafted Fine Jewellery & Moissanite Atelier",
    template: "%s | Faraz Faheem Atelier",
  },
  description:
    "Faraz Faheem (FF Zever) — Premier handcrafted jewellery atelier in Pakistan (ffzever.com). Featuring certified Moissanite solitaires, heirloom 925 sterling silver, and bespoke bridal jewellery crafted to perfection on order. Insured nationwide delivery.",
  keywords: [
    "Faraz Faheem",
    "Faraz Faheem Zever",
    "FF Zever",
    "ffzever",
    "ffzever.com",
    "www.ffzever.com",
    "Faraz Faheem Jewellery",
    "Pakistani jewellery",
    "handcrafted jewellery Pakistan",
    "925 sterling silver Karachi",
    "moissanite rings Pakistan",
    "bridal jewellery sets Pakistan",
    "bespoke jewellery Karachi",
    "custom engagement rings Pakistan",
    "pure silver jewellery Lahore Karachi Islamabad",
  ],
  authors: [{ name: "Faraz Faheem Atelier" }],
  creator: "Faraz Faheem",
  publisher: "Faraz Faheem Atelier",
  alternates: {
    canonical: "https://www.ffzever.com",
  },
  openGraph: {
    title: "Faraz Faheem | Handcrafted Fine Jewellery & Moissanite Atelier (FF Zever)",
    description:
      "Explore Faraz Faheem's heirloom jewellery showcase on ffzever.com. Handcrafted 925 sterling silver, certified D VVS1 Moissanites, and bespoke bridal sets in Pakistan.",
    url: "https://www.ffzever.com",
    siteName: "Faraz Faheem Atelier",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faraz Faheem | Fine Jewellery Atelier (FF Zever)",
    description:
      "Handcrafted 925 sterling silver, certified moissanite, and custom bridal jewellery made to order across Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlee34c2c102a28c308",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": "https://www.ffzever.com/#store",
      name: "Faraz Faheem Atelier",
      alternateName: ["FF Zever", "Faraz Faheem Jewellery", "FFZever", "Faraz Faheem", "ffzever.com"],
      url: "https://www.ffzever.com",
      logo: "https://www.ffzever.com/favicon.ico",
      description:
        "Luxury handcrafted jewellery atelier based in Karachi, Pakistan. Specializing in certified Moissanite solitaires, pure 925 sterling silver, bespoke bridal sets, and custom heirloom pieces.",
      priceRange: "PKR 15,000 - PKR 250,000",
      currenciesAccepted: "PKR",
      paymentAccepted: "Cash on Delivery, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        addressCountry: "PK",
      },
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ffzever.com/#website",
      url: "https://www.ffzever.com",
      name: "Faraz Faheem | FF Zever",
      alternateName: ["FF Zever", "Faraz Faheem", "ffzever.com"],
      publisher: {
        "@id": "https://www.ffzever.com/#store",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.ffzever.com/shop?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", cinzel.variable, jakarta.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#12141A]">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}
