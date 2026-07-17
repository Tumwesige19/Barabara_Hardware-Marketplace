import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";
import { FloatingChatbot } from "@/components/FloatingChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.barabara-hardware-marketplace.com'),
  title: {
    default: "Barabara Hardware | Premium Locks, Security Systems & Supplies Kampala",
    template: "%s | Barabara Hardware"
  },
  description: "Your absolute one-stop hardware partner in Kampala, Uganda. High-security biometric smart door locks, power tools, plumbing accessories, and building materials.",
  keywords: [
    "Barabara",
    "Barabara Hardware",
    "Barabara Hardware Marketplace",
    "Hardware store Kampala",
    "Smart door locks Kampala",
    "Biometric handles Uganda",
    "Wholesale locks Kampala",
    "Uganda locks marketplace"
  ],
  alternates: {
    canonical: 'https://www.barabara-hardware-marketplace.com',
  },
  openGraph: {
    title: "Barabara Hardware | Premium Locks & Security Supplies Kampala",
    description: "Your absolute one-stop hardware partner in Kampala, Uganda. Premium locks, biometric smart handles, deadbolts, and plumbing materials.",
    url: "https://www.barabara-hardware-marketplace.com",
    siteName: "Barabara Hardware",
    locale: "en_UG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "name": "Barabara Hardware Marketplace",
  "alternateName": "Barabara Hardware",
  "url": "https://www.barabara-hardware-marketplace.com",
  "logo": "https://www.barabara-hardware-marketplace.com/favicon.ico",
  "description": "Your ultimate hardware partner in Kampala, Uganda. High-quality smart handle locks, biometric locks, deadbolts, power tools, plumbing, and building materials.",
  "telephone": "+256 555 123 4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Hardware Boulevard, Industrial Area",
    "addressLocality": "Kampala",
    "addressCountry": "UG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "0.3156",
    "longitude": "32.5811"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
            <FloatingChatbot />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
