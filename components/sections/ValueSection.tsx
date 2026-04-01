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
      <div
        className="
        group relative h-full flex flex-col
        text-center p-8 rounded-3xl
        
        backdrop-blur-xl
        bg-neutral-black/95
        
        border border-neutral-white/10
        
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        
        text-neutral-white
        
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        
        hover:-translate-y-3
        hover:scale-[1.015]
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)]
        hover:border-neutral-white/20
      "
      >
        <div
          className="
          pointer-events-none absolute inset-0 rounded-3xl
          opacity-0 group-hover:opacity-100
          transition duration-300
          bg-gradient-to-b from-neutral-white/10 via-transparent to-transparent
        "
        />

        <div
          className="
          pointer-events-none absolute inset-0 rounded-3xl
          bg-gradient-to-b from-neutral-white/10 to-transparent
          opacity-30
        "
        />

        <div className="relative z-10 flex flex-col h-full text-center">

          <div className="mb-6 flex justify-center">
            <div
              className="
              w-14 h-14 sm:w-16 sm:h-16
              flex items-center justify-center 
              rounded-full
              
              bg-brand-300/20
              text-brand-300
              
              transition-all duration-300
              
              group-hover:scale-105
              group-hover:shadow-[0_0_40px_rgba(141,190,79,0.25)]
            "
            >
              {icon}
            </div>
          </div>

          <h3 className="font-heading text-h4 sm:text-h3 mb-3">
            {title}
          </h3>

          <p
            className="
            text-body text-neutral-white/70 
            leading-relaxed
            
            flex-grow
            
            max-w-xs sm:max-w-sm mx-auto
          "
          >
            {desc}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function ValueSection() {
  return (
    <section className="relative bg-neutral-100 py-24 md:py-32 overflow-hidden z-10">
        <div
        className="
            pointer-events-none
            absolute left-1/2 -translate-x-1/2

            top-[-40vh]
            opacity-50
            md:bottom-[-45vh]
            lg:bottom-[-55vh]

            z-[20]
        "
        >
          <div
              className="
              w-[65vh] h-[65vh]
              md:w-[80vh] md:h-[80vh]
              lg:w-[95vh] lg:h-[95vh]

              rounded-full

bg-[radial-gradient(circle,rgba(var(--color-brand-300-rgb),0.22),rgba(var(--color-brand-300-rgb),0.12)_40%,transparent_75%)]
              "
          />

          <div
              className="
              absolute inset-0

              w-[90vh] h-[90vh]
              md:w-[105vh] md:h-[105vh]
              lg:w-[120vh] lg:h-[120vh]

              -translate-x-[10%] -translate-y-[10%]

              rounded-full
              opacity-70

              bg-[radial-gradient(circle,rgba(var(--color-brand-300-rgb),0.22),rgba(var(--color-brand-300-rgb),0.12)_40%,transparent_75%)]
              "
          />
        </div>
      <div className="relative max-w-container mx-auto px-6 lg:px-12 z-25">

        <RevealOnScroll>
          {(visible) => (
            <>
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

              <Motion show={visible} delay={0.2}>
                <StaggerContainer isActive={visible}>
                  <div
                    className="
                    grid
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3
                    gap-8 lg:gap-10
                    
                    auto-rows-fr
                    items-stretch
                  "
                  >

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