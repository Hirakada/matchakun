import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ClientWrapper from "@/components/ui/ClientWrapper";

import { Inter, Baloo_2 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>
        </ClientWrapper>

        <Analytics />
      </body>
    </html>
  );
}