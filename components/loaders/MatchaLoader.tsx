"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type BubbleConfig = {
  size: number;
  left: number;
  delay: number;
  drift: number;
  duration: number;
};

export default function MatchaLoader({
  isDone,
  onFinish,
}: {
  isDone?: boolean;
  onFinish?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // ✅ SSR-safe: start null (no mismatch)
  const [bubbles, setBubbles] = useState<BubbleConfig[] | null>(null);

  const [show, setShow] = useState(true);

  const finalDone = done || isDone;

  // ===== GENERATE BUBBLES (CLIENT ONLY) =====
  useEffect(() => {
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      size: 4 + Math.random() * 8,
      left: Math.random() * 100,
      delay: i * 0.25,
      drift: Math.random() * 10 - 5,
      duration: 2 + Math.random(),
    }));

    setBubbles(generated);
  }, []);

  // ===== LOCK SCROLL =====
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // ===== PROGRESS =====
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return p + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // ===== EXIT CONTROL =====
  useEffect(() => {
    if (finalDone) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [finalDone]);

  useEffect(() => {
    if (!show && onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [show, onFinish]);

  const getText = () => {
    if (progress < 25) return "Preparing matcha...";
    if (progress < 50) return "Sifting powder...";
    if (progress < 75) return "Whisking...";
    return "Almost ready...";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F4E7D3]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ZOOM GROUP */}
          <motion.div
            className="flex flex-col items-center"
            style={{ transformOrigin: "center center" }}
            animate={
              finalDone
                ? { scale: 20, y: -200 }
                : { y: [0, -10, -6, 0] }
            }
            transition={
              finalDone
                ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* BOWL */}
            <div className="relative w-[320px] h-[180px] flex items-end justify-center">
              <div className="relative w-[260px] h-[90px] border-[5px] border-[#3A3A3A] rounded-t-[10px] rounded-b-[120px] overflow-hidden">

                {/* RIM */}
                <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[95%] h-[20px] border-[5px] border-[#3A3A3A] border-b-0 rounded-full bg-[#F4E7D3]" />

                {/* MATCHA */}
                <div className="absolute bottom-0 w-full h-[75%]">

                  {/* BACK */}
                  <motion.div
                    className="absolute bottom-0 w-full h-full bg-[#7FBF2E] opacity-40"
                    animate={{
                      x: [8, -8, 8],
                      borderTopLeftRadius: ["40% 70%", "60% 40%", "40% 70%"],
                      borderTopRightRadius: ["60% 40%", "40% 70%", "60% 40%"],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* MID */}
                  <motion.div
                    className="absolute bottom-0 w-full h-full bg-brand-500 opacity-60 mix-blend-multiply"
                    animate={{
                      x: [-4, 4, -4],
                      borderTopLeftRadius: ["55% 45%", "45% 65%", "55% 45%"],
                      borderTopRightRadius: ["45% 65%", "55% 45%", "45% 65%"],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* FRONT */}
                  <motion.div
                    className="absolute bottom-0 w-full h-full bg-brand-300"
                    animate={{
                      x: [-8, 8, -8],
                      borderTopLeftRadius: ["60% 40%", "40% 70%", "60% 40%"],
                      borderTopRightRadius: ["40% 70%", "60% 40%", "40% 70%"],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* BUBBLES */}
                  <div className="absolute bottom-0 w-full h-full overflow-hidden">
                    {bubbles?.map((b, i) => (
                      <motion.div
                        key={i}
                        className="absolute bottom-0 bg-white/30 rounded-full"
                        style={{
                          width: b.size,
                          height: b.size,
                          left: `${b.left}%`,
                        }}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                          y: -60,
                          opacity: [0, 0.5, 0],
                          x: [0, b.drift, 0],
                        }}
                        transition={{
                          duration: b.duration,
                          repeat: Infinity,
                          delay: b.delay,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <motion.p
              className="mt-12 text-[#2F2F2F] text-sm tracking-widest uppercase"
              animate={{
                opacity: finalDone ? 0 : 1,
                y: finalDone ? 20 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {getText()}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}