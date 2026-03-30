"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import LinkText from "./LinkText";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(!isHome);
  const [animating, setAnimating] = useState<"down" | "up" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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

            setTimeout(() => {
              setScrolled(false);
            }, 100);
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
  }, [scrolled]);

  return (
    <nav
      className={`
        w-full z-50
        transition-[background-color,backdrop-filter,box-shadow]
        duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          scrolled
            ? "fixed top-0 bg-neutral-white/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "absolute top-0 bg-transparent"
        }
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

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="images/wordmark.svg"
            alt="Matcha Kun"
            width={240}
            height={48}
            className="h-9 lg:h-12 w-auto transition-all duration-500"
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6 text-body-sm font-heading">
          <LinkText
            href="/menu"
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
            className="bg-neutral-black text-white transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </Button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden ml-2 relative z-50"
        >
          <div className="space-y-1">
            <span
              className={`block w-5 h-0.5 transition ${
                scrolled ? "bg-neutral-black" : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition ${
                scrolled ? "bg-neutral-black" : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition ${
                scrolled ? "bg-neutral-black" : "bg-white"
              }`}
            />
          </div>
        </button>
      </div>

      {/* MOBILE FLYOUT */}
      <div
        className={`
          lg:hidden absolute top-full right-4 mt-2 w-64 origin-top-right
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }
        `}
      >
        <div
          className={`
            rounded-2xl p-5 flex flex-col items-center text-center gap-5
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            ${
              scrolled
                ? "bg-neutral-white/90 backdrop-blur-md"
                : "bg-black/70 backdrop-blur-md"
            }
          `}
        >
          <Link
            href="/menu"
            onClick={() => setIsOpen(false)}
            className={`
              w-full text-center transition
              ${scrolled ? "text-neutral-black" : "text-white"}
            `}
          >
            Know Your Matcha!
          </Link>

          <Button
            variant="default"
            href="https://ig.me/m/matchakun.id"
            className="w-full bg-neutral-black text-white justify-center"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
}