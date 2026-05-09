import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ClientWrapper from "@/components/providers/ClientWrapper";

import { Inter, Baloo_2, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  description: "Matcha for Modern Living",
  icons: {
    icon: [
      { url: "/icons/logo/favicon-brand.ico" },

      {
        url: "/icons/logo/favicon-brand.ico",
        media: "(prefers-color-scheme: light)",
      },

      {
        url: "/icons/logo/favicon-light.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  verification: {
    google: "8vIUEh4uMiGei264_Vwwa5NGN48Nc43PQrggJC6pcOo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${baloo.variable} bg-neutral-white text-neutral-black antialiased`}
      >
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>
        </ClientWrapper>

        <Analytics />
      </body>
    </html>
  );
}