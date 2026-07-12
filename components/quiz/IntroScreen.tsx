"use client";

import { motion } from "framer-motion";

import Button from "@/components/ui/Button";
import { useQuiz } from "./QuizProvider";

export default function IntroScreen() {
  const { startGame } = useQuiz();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mx-auto
        flex
        w-full
        h-full
        flex-col
        items-center
        px-4
        pt-20
        text-center
      "
    >

      <span
        className="
          rounded-full
          bg-brand-100
          px-4
          py-2
          text-sm
          font-medium
          text-brand-700
        "
      >
        MATCHA QUEST
      </span>

      <h2
        className="
          mt-6
          text-display
          font-heading
          text-neutral-black
        "
      >
        Find Your Perfect Matcha
      </h2>

      <p
        className="
          mt-5
          max-w-xl
          text-body
          text-neutral-500
        "
      >
        Answer four quick questions and discover the
        Matcha Kun drink that best matches your taste.
      </p>

      <Button
        className="mt-12"
        onClick={startGame}
      >
        Start Quest
      </Button>

      <div
        className="
          mt-12
          flex
          flex-col
          items-center
          gap-4
          text-neutral-400
        "
      >
        <div className="hidden md:flex items-center gap-2">

          {["A", "S", "D"].map((key) => (
            <kbd
              key={key}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-neutral-300
                bg-white
                font-semibold
                shadow-sm
              "
            >
              {key}
            </kbd>
          ))}

          <span className="mx-2">
            +
          </span>

          <kbd
            className="
              rounded-lg
              border
              border-neutral-300
              bg-white
              px-4
              py-2
              font-semibold
              shadow-sm
            "
          >
            ENTER
          </kbd>

        </div>

        <div className="md:hidden text-sm">
          Swipe • Tap
        </div>

      </div>

      <motion.p
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
          mt-10
          text-sm
          text-neutral-400
        "
      >
        Complete in under 30 seconds
      </motion.p>
    </motion.div>
  );
}