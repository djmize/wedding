import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import config from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: `${config.partner1} & ${config.partner2}`,
  description: `The wedding of ${config.partner1} and ${config.partner2}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${lato.variable} bg-cream text-bark antialiased`}
            style={{ fontFamily: "var(--font-lato), sans-serif" }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
