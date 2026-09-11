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
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={cn("h-full", "antialiased", cinzel.variable, jakarta.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#12141A]">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}
