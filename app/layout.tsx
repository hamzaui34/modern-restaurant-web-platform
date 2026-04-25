import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";
import BackToTop from "@/components/ui/BackToTop";
import FloatingReserveButton from "@/components/ui/FloatingReserveButton";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Ember | Fine Dining Reservations & Food Delivery",
  description: "Experience exceptional dining at Royal Ember. Reserve your table or order food for delivery and pickup. Premium restaurant with luxury ambiance.",
  keywords: "restaurant, dining, reservations, food delivery, fine dining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${notoSerif.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface text-on-surface antialiased overflow-x-hidden">
        <PageTransition>
          {children}
        </PageTransition>
        <BackToTop />
        <FloatingReserveButton />
      </body>
    </html>
  );
}
