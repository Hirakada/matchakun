"use client";

import { useState } from "react";
import { matchaMenu, MatchaItem } from "@/data/matchaMenu";

import HeroSection from "@/components/sections/HeroSection";
import ValueSection from "@/components/sections/ValueSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  const [active, setActive] = useState<MatchaItem>(matchaMenu[0]);

  return (
    <main className="relative z-10 bg-transparent">
      {/* HERO — TANPA ANIMASI */}
      <HeroSection
        active={active}
        setActive={setActive}
        menu={matchaMenu}
      />

      {/* SECTION LAIN (boleh tetap animasi kalau mau) */}
      <ValueSection />
      <CTASection />
    </main>
  );
}