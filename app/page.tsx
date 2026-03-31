"use client";

import { useState } from "react";
import { matchaMenu, MatchaBase } from "@/data/matchaMenu";

import HeroSection from "@/components/sections/HeroSection";
import ValueSection from "@/components/sections/ValueSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  const [active, setActive] = useState<MatchaBase>(matchaMenu[0]);

  return (
    <main className="relative z-10 bg-transparent">
      <HeroSection
        active={active}
        setActive={setActive}
        menu={matchaMenu}
      />
      <ValueSection />
      <CTASection />
    </main>
  );
}