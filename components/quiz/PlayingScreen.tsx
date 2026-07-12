"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useKeyboard } from "@/hooks/useKeyboard";
import { useSwipe } from "@/hooks/useSwipe";

import { useQuiz } from "./QuizProvider";

import GameHUD from "./GameHUD";
import QuestionCard from "./QuestionCard";
import OptionCard from "./OptionCard";

export default function PlayingScreen() {
  const {
    question,

    isAnimating,

    moveLeft,
    moveCenter,
    moveRight,

    confirmSelection,
  } = useQuiz();

  useKeyboard({
    enabled: !isAnimating,

    onLeft: moveLeft,

    onCenter: moveCenter,

    onRight: moveRight,

    onConfirm: () => confirmSelection(),
  });

  const swipe = useSwipe({
    enabled: !isAnimating,

    onLeft: moveLeft,

    onCenter: moveCenter,

    onRight: moveRight,

    onTap: () => confirmSelection(),
  });

  return (
    <main
      {...swipe}
      className="flexmin-h-full flex-col overflow-hidden justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
    >
      <GameHUD />

      <div className="flex px-4 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -24,
            }}
            transition={{
              duration: 0.35,
            }}
            className="flex min-h-0 flex-1 flex-col justify-between gap-4"
          >
            <div className="flex-1 min-h-0">
              <QuestionCard />
            </div>

            <div className="flex w-full gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3 lg:grid lg:grid-cols-3 lg:justify-center lg:overflow-visible lg:snap-none lg:pb-0">
              {question.options.map((option, index) => (
                <div
                  key={option.id}
                  className="snap-center lg:snap-none"
                >
                  <OptionCard option={option} index={index} />
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:hidden">
              <span className="rounded-full bg-neutral-100 px-3 py-2 text-sm text-neutral-500">
                Swipe • Tap
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}