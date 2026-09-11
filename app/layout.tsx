import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import StoreLayoutWrapper from "@/components/StoreLayoutWrapper";
import "./globals.css";

/**
 * Server Component: Root application layout providing luxury typography,
 * StoreLayoutWrapper (isolating /studio from storefront UI), and global SEO metadata.
 */

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelia & Co. | Fine Handcrafted Jewellery & Moissanite Atelier",
  description:
    "Explore Aurelia & Co.'s heirloom jewellery showcase. Handcrafted 925 sterling silver, certified D VVS1 Moissanite, natural emeralds, and bespoke bridal collections made in Karachi since 1947.",
  keywords: [
    "jewellery showcase",
    "moissanite rings",
    "925 sterling silver jewellery",
    "karachi jewellery",
    "bridal jewellery sets",
    "emerald pendants",
    "handcrafted jewellery",
  ],
  openGraph: {
    title: "Aurelia & Co. | Fine Handcrafted Jewellery & Moissanite Atelier",
    description: "Exclusive jewellery showcase featuring certified moissanites and fine 925 silver craftsmanship.",
    url: "https://aureliajewellery.com",
    siteName: "Aurelia Fine Jewellery",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#12141A]">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}
