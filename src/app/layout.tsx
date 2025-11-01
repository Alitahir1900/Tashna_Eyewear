import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tashna Eyewear - Premium Eyewear Collection",
  description: "Shop high-quality frames, sunglasses, vision glasses, and contact lenses at Tashna Eyewear. Discover your perfect style today.",
  keywords: ["eyewear", "sunglasses", "frames", "vision glasses", "contact lenses", "Tashna"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
