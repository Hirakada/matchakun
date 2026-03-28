import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-white/80 backdrop-blur border-b z-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <h1 className="font-semibold text-lg">Matcha Kun</h1>

        <div className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
        </div>
      </div>
    </nav>
  );
}