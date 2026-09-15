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
    default: "FFZever | Faraz Faheem Handcrafted 925 Silver Jewellery (Since 1982)",
    template: "%s | FFZever — Faraz Faheem",
  },
  description:
    "FFZever (Since 1982) by Faraz Faheem — Premier handcrafted 925 sterling silver jewellery atelier in Pakistan (ffzever.com). Featuring pure solid silver locket sets, pendants, tops, and bespoke bridal collections with insured nationwide delivery.",
  keywords: [
    "FFZever",
    "FF Zever",
    "ffzever",
    "ffzever.com",
    "www.ffzever.com",
    "Faraz Faheem",
    "Faraz Faheem Zever",
    "Faraz Faheem Jewellery",
    "Pakistani jewellery",
    "handcrafted jewellery Pakistan",
    "925 sterling silver Pakistan",
    "moissanite rings Pakistan",
    "bridal jewellery sets Pakistan",
    "bespoke jewellery Pakistan",
    "custom engagement rings Pakistan",
    "pure silver jewellery Pakistan",
  ],
  authors: [{ name: "FFZever Atelier" }],
  creator: "Faraz Faheem",
  publisher: "FFZever",
  alternates: {
    canonical: "https://www.ffzever.com",
  },
  openGraph: {
    title: "FFZever | Faraz Faheem Handcrafted 925 Silver Jewellery (Since 1982)",
    description:
      "Explore FFZever's handcrafted jewellery showcase on ffzever.com. Pure solid 925 sterling silver, certified moissanites, and bespoke bridal sets in Pakistan since 1982.",
    url: "https://www.ffzever.com",
    siteName: "FFZever",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FFZever | Handcrafted Jewellery Since 1982 (Faraz Faheem)",
    description:
      "Handcrafted 925 sterling silver, certified moissanite, and custom bridal jewellery made to order across Pakistan by FFZever.",
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
      name: "FFZever",
      alternateName: ["FF Zever", "Faraz Faheem Jewellery", "FFZever Atelier", "Faraz Faheem", "ffzever.com", "www.ffzever.com"],
      url: "https://www.ffzever.com",
      logo: "https://www.ffzever.com/favicon.ico",
      description:
        "FFZever (Since 1982) by Faraz Faheem — Premier handcrafted 925 sterling silver jewellery atelier based in Pakistan. Specializing in hallmarked 925 silver, locket sets, pendants, earrings, bracelets, and bridal jewellery.",
      priceRange: "PKR 14,000 - PKR 250,000",
      currenciesAccepted: "PKR",
      paymentAccepted: "Cash on Delivery, Bank Transfer",
      address: {
        "@type": "PostalAddress",
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
      name: "FFZever",
      alternateName: ["FF Zever", "Faraz Faheem", "FFZever Jewellery", "ffzever.com"],
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
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#0F172A]">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}
