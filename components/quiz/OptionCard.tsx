"use client";

import { motion } from "framer-motion";

import { QuizOption } from "@/data/matchaQuestions";
import { useQuiz } from "./QuizProvider";

interface OptionCardProps {
  option: QuizOption;
  index: number;
}

export default function OptionCard({
  option,
  index,
}: OptionCardProps) {
  const {
    selectedLane,
    isAnimating,
    selectLane,
    confirmSelection,
  } = useQuiz();

  const selected = selectedLane === index;

  function handleClick() {
    confirmSelection(index);
  }

  function handleHover() {
    if (isAnimating) return;
    selectLane(index);
  }

  return (
    <motion.button
      type="button"
      layout
      whileHover={
        !isAnimating
          ? {
              y: -6,
              scale: 1.02,
            }
          : undefined
      }
      whileTap={
        !isAnimating
          ? {
              scale: 0.98,
            }
          : undefined
      }
      animate={{
        scale: selected ? 1.03 : 1,
        y: selected ? -6 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      onClick={handleClick}
      disabled={isAnimating}
      className={`
        group
        relative
        flex
        h-full
        w-[260px]
        flex-none
        snap-center
        overflow-hidden
        rounded-[28px]
        border
        p-4
        transition-all

        md:p-6
        lg:w-full

        ${
          selected
            ? "border-brand-500 bg-brand-50 shadow-lg"
            : "border-neutral-200 bg-white hover:border-brand-300"
        }

        ${
          isAnimating
            ? "pointer-events-none"
            : ""
        }
      `}
    >
      {selected && (
        <motion.div
          layoutId="quiz-selection"
          className="
            absolute
            inset-0
            rounded-[28px]
            border-2
            border-brand-500
          "
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
          }}
        />
      )}

      <div className="flex h-full w-full flex-col justify-between text-left">

        <div>
          <motion.div
            animate={{
              scale: selected ? 1.15 : 1,
              rotate: selected ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="text-4xl md:text-5xl"
          >
            {option.emoji}
          </motion.div>

          <h3 className="mt-5 text-h5 font-heading text-neutral-black">
            {option.title}
          </h3>

          <p className="text-sm leading-relaxed text-neutral-500">
            {option.subtitle}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              text-sm
              font-semibold

              ${
                selected
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-neutral-300 text-neutral-500"
              }
            `}
          >
            {option.hotkey}
          </div>
        </div>

      </div>
    </motion.button>
  );
}