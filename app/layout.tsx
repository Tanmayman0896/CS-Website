import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Space_Grotesk, Fraunces, EB_Garamond, Prata, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ieee cs muj",
  description: "ieee cs muj website",
};

import Preloader from "@/src/components/common/Preloader";
import { LoadingProvider } from "@/src/context/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${ebGaramond.variable} ${prata.variable} ${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <LoadingProvider>
          <Preloader />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}