import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter, Baloo_2 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Matcha Kun",
  description: "Matcha for Modern Living",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${baloo.variable} bg-neutral-white text-neutral-black antialiased`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>

        <Analytics />
      </body>
    </html>
  );
}