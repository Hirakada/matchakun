"use client";

import { useState } from "react";
import { matchaMenu, MatchaBase } from "@/data/matchaMenu";

import HeroSection from "@/components/sections/HeroSection";
import ValueSection from "@/components/sections/ValueSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  const [active, setActive] = useState<MatchaBase>(matchaMenu[0]);

  return (
    <main className="relative z-10 bg-transparent overflow-x-hidden">
      <HeroSection
        active={active}
        setActive={setActive}
        menu={matchaMenu}
      />
      {/* SEO SHADOW CONTENT */}
      <section className="sr-only">
        <h2>Menu Matcha Matcha Kun</h2>

        {matchaMenu.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>

            <ul>
              {item.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <ValueSection />
      <CTASection />
    </main>
  );
}