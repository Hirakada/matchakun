"use client";

import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Motion from "@/components/motion/Motion";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(141,190,79,0.12),transparent_70%)]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="
          relative text-center rounded-[28px] md:rounded-[32px]
          
          px-6 sm:px-8 md:px-12 
          py-10 sm:py-12 md:py-14
          
          bg-neutral-black/95
          backdrop-blur-xl
          
          border border-white/10
          
          shadow-[0_20px_80px_rgba(0,0,0,0.4)]
        ">

          <div className="
            pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[32px]
            bg-gradient-to-b from-white/10 to-transparent
            opacity-40
          " />

          <RevealOnScroll>
            {(visible) => (
              <>
                <Motion show={visible}>
                  <h2 className="
                    font-heading 
                    text-h3 sm:text-h2 
                    text-white
                    tracking-tight
                    mb-4 sm:mb-6
                  ">
                    Join the Matcha Movement
                  </h2>
                </Motion>

                {/* TEXT */}
                <Motion show={visible} delay={0.1}>
                  <p className="
                    text-body 
                    text-white/70 
                    max-w-md sm:max-w-lg 
                    mx-auto 
                    mb-8 sm:mb-10
                  ">
                    Follow us on Instagram for updates, promos, and matcha inspiration.
                  </p>
                </Motion>

                <Motion show={visible} delay={0.2}>
                  <div className="flex justify-center">
                    <Button
                      href="https://ig.me/m/matchakun.id"
                      className="
                        inline-flex items-center justify-center
                        
                        px-6 sm:px-8 md:px-10
                        py-3 sm:py-4
                        
                        text-sm sm:text-base
                        rounded-full
                        
                        text-white
                        
                        bg-gradient-to-r 
                        from-brand-500 
                        to-brand-300
                        
                        shadow-[0_10px_30px_rgba(141,190,79,0.3)]
                        
                        transition-all duration-300
                        
                        hover:scale-105
                        hover:shadow-[0_20px_50px_rgba(141,190,79,0.45)]
                      "
                    >
                      Follow @matchakun.id
                    </Button>
                  </div>
                </Motion>
              </>
            )}
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}