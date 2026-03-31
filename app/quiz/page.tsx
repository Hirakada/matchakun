"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMatchaQuiz } from "@/hooks/useMatchaQuiz";
import { getMatchaProductById, formatRupiah } from "@/data/matchaMenu";
import { steps } from "@/lib/matchaQuiz";
import Button from "@/components/ui/Button";

const variants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export default function QuizPage() {
  const { step, select, resultId } = useMatchaQuiz();
  const product = resultId ? getMatchaProductById(resultId) : null;

  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <section className="flex items-center justify-center bg-cream-100 min-h-screen">
      <div className="max-w-300 mx-auto px-4 lg:px-12 h-full flex flex-col justify-center">

        {/* CONTENT WRAPPER (PT DI SINI, BUKAN SECTION) */}
        <div className="w-full max-w-xl mx-auto text-center pt-20 lg:pt-24">

          {/* PROGRESS */}
          <div className="absolute top-0 left-0 right-0 flex flex-col mb-6">
            <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-body-sm text-neutral-300 mt-2 text-center">
              Step {stepIndex + 1} of {steps.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >

              {/* EXPERIENCE */}
              {step === "experience" && (
                <>
                  <h1 className="text-h3 font-heading text-neutral-black">
                    Seberapa kenal kamu dengan matcha?
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button variant="quiz" onClick={() => select("experience", "beginner")}>
                      Baru coba 🍃
                    </Button>

                    <Button variant="quiz" onClick={() => select("experience", "casual")}>
                      Lumayan ☕
                    </Button>

                    <Button variant="quiz" onClick={() => select("experience", "enthusiast")}>
                      Matcha lover 🍵
                    </Button>
                  </div>
                </>
              )}

              {/* DIETARY */}
              {step === "dietary" && (
                <>
                  <h1 className="text-h3 font-heading text-neutral-black">
                    Ada yang kamu hindari?
                  </h1>

                  <div className="flex flex-col gap-3">
                    <Button variant="quiz" onClick={() => select("dietary", "none")}>
                      Santai aja 🍃
                    </Button>

                    <Button variant="quiz" onClick={() => select("dietary", "no_oat")}>
                      Hindari oat 🌾
                    </Button>
                  </div>
                </>
              )}

              {/* TEXTURE */}
              {step === "texture" && (
                <>
                  <h1 className="text-h3 font-heading text-neutral-black">
                    Lagi pengen yang mana?
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button variant="quiz" onClick={() => select("texture", "clean")}>
                      Pure 🍵
                    </Button>

                    <Button variant="quiz" onClick={() => select("texture", "creamy_smooth")}>
                      Creamy 🥛
                    </Button>

                    <Button variant="quiz" onClick={() => select("texture", "creamy_fresh")}>
                      Fresh ❄️
                    </Button>
                  </div>
                </>
              )}

              {/* FLAVOR */}
              {step === "flavor" && (
                <>
                  <h1 className="text-h3 font-heading text-neutral-black">
                    Taste kamu seperti apa?
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button variant="quiz" onClick={() => select("flavor", "nutty_creamy")}>
                      Nutty 🤎
                    </Button>

                    <Button variant="quiz" onClick={() => select("flavor", "umami_bold")}>
                      Umami 🌊
                    </Button>

                    <Button variant="quiz" onClick={() => select("flavor", "balanced")}>
                      Balanced 🌿
                    </Button>
                  </div>
                </>
              )}

              {/* RESULT */}
              {step === "result" && product && (
                <div className="space-y-6">
                  <h1 className="text-h3 font-heading text-neutral-black">
                    Your Matcha 🍃
                  </h1>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="
                      bg-neutral-white
                      rounded-2xl
                      p-6
                      border border-neutral-200
                      shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                    "
                  >
                    <img
                      src={product.base.image}
                      alt={product.name}
                      className="w-32 sm:w-40 mx-auto mb-4"
                    />

                    <h2 className="text-h4 font-heading text-neutral-black">
                      {product.name}
                    </h2>

                    <p className="text-body text-neutral-300 mt-2">
                      {product.base.description}
                    </p>

                    <p className="mt-4 text-h5 font-semibold text-brand-500">
                      {formatRupiah(product.price)}
                    </p>
                  </motion.div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}