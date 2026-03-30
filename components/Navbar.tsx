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
            }, 100); // sesuai duration navbar-up
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
      <div className="max-w-300 mx-auto px-4 md:px-12 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center">
          <Image
            src={scrolled ? "images/wordmark.svg" : "images/wordmark.svg"}
            alt="Matcha Kun"
            width={240}
            height={48}
            className="h-10 md:h-12 w-auto transition-all duration-500"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-6 text-body-sm font-heading">

          <LinkText
            href="/menu"
            className={`
              hidden sm:inline-block
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

          <button className="sm:hidden ml-2">
            <div className="space-y-1">
              <span className={`block w-5 h-0.5 transition ${scrolled ? "bg-neutral-black" : "bg-white"}`} />
              <span className={`block w-5 h-0.5 transition ${scrolled ? "bg-neutral-black" : "bg-white"}`} />
              <span className={`block w-5 h-0.5 transition ${scrolled ? "bg-neutral-black" : "bg-white"}`} />
            </div>
          </button>

        </div>
      </div>
    </nav>
  );
}