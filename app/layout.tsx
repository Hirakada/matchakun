import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Matcha Kun",
  description: "Modern matcha for everyday energy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}