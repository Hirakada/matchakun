import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-300 mx-auto x-4 md:px-12 py-4 flex items-center justify-between">
        <Image src="/logo.svg" alt="Matcha Kun" width={100} height={100} className="h-4 md:h-6 w-auto"/>

        <div className="flex items-center gap-6 text-body-sm font-baloo">
          <Link className="hover:text-cream-100" href="/menu">
            Know Your Matcha!
          </Link>
            <a
              href="https://ig.me/m/matchakun.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-300 text-white rounded-full text-button font-medium hover:opacity-90 transition"
            >
              Contact Us
            </a>
        </div>
      </div>
    </nav>
  );
}