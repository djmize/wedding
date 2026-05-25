import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne, Work_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import config from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin-ext"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${config.partner1} & ${config.partner2}`,
  description: `The wedding of ${config.partner1} and ${config.partner2}`,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${parisienne.variable} ${workSans.variable} bg-cream text-bark antialiased`}
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
