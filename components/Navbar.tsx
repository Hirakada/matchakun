import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-neutral-white/80 backdrop-blur border-b border-neutral-200 z-50">
      <div className="max-w-container mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <h1 className="font-heading text-body font-semibold">
          Matcha Kun
        </h1>

        <div className="flex gap-6 text-body-sm font-sans">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
        </div>
      </div>
    </nav>
  );
}