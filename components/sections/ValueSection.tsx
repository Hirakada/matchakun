"use client";

import { Leaf, Sparkles, HeartPulse } from "lucide-react";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Motion from "@/components/motion/Motion";

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <SpotlightCard className="h-full">
      <div className="
        group relative h-full flex flex-col justify-between
        text-center p-8 rounded-3xl
        
        backdrop-blur-xl
        bg-neutral-black/95
        
        border border-white/10
        
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        
        text-white
        
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        
        hover:-translate-y-3
        hover:scale-[1.015]
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)]
        hover:border-white/20
      ">

        <div className="
          pointer-events-none absolute inset-0 rounded-3xl
          opacity-0 group-hover:opacity-100
          transition duration-300
          bg-gradient-to-b from-white/10 via-transparent to-transparent
        " />

        <div className="
          pointer-events-none absolute inset-0 rounded-3xl
          bg-gradient-to-b from-white/10 to-transparent
          opacity-30
        " />

        <div className="relative z-10 flex flex-col h-full">

          <div className="
            w-16 h-16 mx-auto flex items-center justify-center 
            rounded-full
            bg-brand-300/20
            text-brand-300
            mb-6
            transition-all duration-300
            group-hover:scale-105
            group-hover:shadow-[0_0_40px_rgba(141,190,79,0.25)]
          ">
            {icon}
          </div>

          <h3 className="font-heading text-h3 mb-3">{title}</h3>

          <p className="text-body text-white/70 leading-relaxed flex-grow">
            {desc}
          </p>

        </div>
      </div>
    </SpotlightCard>
  );
}

export default function ValueSection() {
  return (
    <section className="relative bg-neutral-100 py-24 md:py-32 overflow-visible">

      {/* STATIC BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,190,79,0.12),transparent_60%)]" />

      <div className="relative max-w-container mx-auto px-6 lg:px-12">

        <RevealOnScroll>
          {(visible) => (
            <>
              {/* HEADING */}
              <Motion show={visible}>
                <div className="text-center mb-16 md:mb-20">
                  <h2 className="font-heading text-h2 tracking-tight text-neutral-black">
                    Why Matcha Kun?
                  </h2>
                  <p className="mt-4 text-neutral-black/60 max-w-xl mx-auto">
                    Lebih dari sekadar minuman—ini adalah pengalaman rasa, energi, dan gaya hidup.
                  </p>
                </div>
              </Motion>

              {/* CARDS */}
              <Motion show={visible} delay={0.2}>
                <StaggerContainer isActive={visible}>
                  <div className="
                    grid
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3
                    gap-8 lg:gap-10
                    auto-rows-fr
                  ">

                    <StaggerItem className="h-full">
                      <Card
                        icon={<Leaf size={28} strokeWidth={2.2} />}
                        title="Ceremonial Grade"
                        desc="Matcha berkualitas tinggi dengan rasa umami halus, tanpa pahit, dan aroma autentik khas Jepang."
                      />
                    </StaggerItem>

                    <StaggerItem className="h-full">
                      <Card
                        icon={<Sparkles size={28} strokeWidth={2.2} />}
                        title="Matcha Fusion"
                        desc="Kombinasi matcha dengan rasa modern seperti vanilla, chocolate, dan signature blend yang unik."
                      />
                    </StaggerItem>

                    <StaggerItem className="h-full">
                      <Card
                        icon={<HeartPulse size={28} strokeWidth={2.2} />}
                        title="Modern Lifestyle"
                        desc="Mendukung fokus, energi stabil, dan gaya hidup aktif yang produktif setiap hari."
                      />
                    </StaggerItem>

                  </div>
                </StaggerContainer>
              </Motion>
            </>
          )}
        </RevealOnScroll>

      </div>
    </section>
  );
}