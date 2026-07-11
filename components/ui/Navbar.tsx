"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import LinkText from "./LinkText";

export default function Navbar() {
  const pathname = usePathname() || "";

  const isHome = pathname === "/";
  const isSpecialPage =
    pathname.startsWith("/quiz") ||
    pathname.startsWith("/order");

  const [scrolled, setScrolled] = useState(false);
  const [animating, setAnimating] = useState<"down" | "up" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSpecialPage) {
      setScrolled(false);
      return;
    }

    let ticking = false;

    const calculate = () => {
      const hero = document.getElementById("hero");
      if (!hero) return true;

      const rect = hero.getBoundingClientRect();
      const trigger = rect.height * 0.95;

      return rect.top <= -trigger;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const next = calculate();

        if (next !== scrolled) {
          if (next) {
            setAnimating("down");
            setScrolled(true);
          } else {
            setAnimating("up");
            setTimeout(() => setScrolled(false), 100);
          }
        }

        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrolled, isSpecialPage]);

  const navClass = isSpecialPage
    ? "fixed top-0 bg-transparent"
    : scrolled
    ? "fixed top-0 bg-neutral-white/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    : "absolute top-0 bg-transparent";

  return (
    <nav
      className={`
        w-full z-50
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${navClass}
        ${
          animating === "down"
            ? "animate-navbar-down"
            : animating === "up"
            ? "animate-navbar-up"
            : ""
        }
      `}
    >
      <div className="max-w-300 mx-auto px-4 lg:px-12 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center">
          <Image
            src="/images/wordmark.svg"
            alt="Matcha Kun"
            width={240}
            height={48}
            priority
            className={`
              h-9 lg:h-12 w-auto transition duration-300
              ${scrolled || isSpecialPage ? "" : "invert brightness-0"}
            `}
          />
        </Link>

        {isSpecialPage ? (
          <LinkText
            href="/"
            className="text-neutral-black hover:text-brand-500 transition-colors duration-300"
          >
            Home
          </LinkText>
        ) : (
          <>
            <div className="hidden lg:flex items-center gap-6 text-body-sm font-heading">

              <LinkText
                href="/quiz"
                className={`
                  transition-colors duration-300
                  ${
                    scrolled
                      ? "text-neutral-black hover:text-brand-500"
                      : "text-white hover:text-white/80"
                  }
                `}
              >
                Know Your Matcha!
              </LinkText>

              <Button
                variant="default"
                href="https://ig.me/m/matchakun.id"
                className="bg-neutral-black text-white"
              >
                Contact Us
              </Button>

            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden ml-2 relative z-50"
            >
              <div className="space-y-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`block w-5 h-0.5 transition ${
                      scrolled ? "bg-neutral-black" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </button>
          </>
        )}
      </div>

      {!isSpecialPage && (
        <div
          className={`
            lg:hidden absolute top-full right-4 mt-2 w-64 origin-top-right
            transition-all duration-500
            ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }
          `}
        >
          <div className="rounded-2xl p-5 flex flex-col items-center gap-5 bg-neutral-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

            <Link
              href="/quiz"
              onClick={() => setIsOpen(false)}
              className="text-neutral-black"
            >
              Know Your Matcha!
            </Link>

            <Button
              variant="default"
              href="https://ig.me/m/matchakun.id"
              className="w-full bg-neutral-black text-white"
            >
              Contact Us
            </Button>

          </div>
        </div>
      )}
    </nav>
  );
}