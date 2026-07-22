import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import ModalProvider from "@/components/ModalProvider";
import { site } from "@/content/site";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory font-body text-ink antialiased">
        <ModalProvider>
          <TopBar />
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <StickyMobileBar />
        </ModalProvider>
      </body>
    </html>
  );
}
