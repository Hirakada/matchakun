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

export const metadata = {
  title: "Matcha Kun",
  description: "Modern matcha drinks",

  icons: {
    icon: [
      "/icons/logo/favicon-brand.ico",

      {
        url: "/icons/logo/favicon-brand.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/logo/favicon-light.ico",
        media: "(prefers-color-scheme: dark)",
      },

      {
        url: "/icons/logo/favicon-brand-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/logo/favicon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],

    apple: "/icons/logo/apple-touch-icon.png",
  },

  manifest: "/icons/logo/site.webmanifest",
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
        <main>{children}</main>

        <Analytics />
      </body>
    </html>
  );
}