"use client";

import { motion } from "framer-motion";

import { Step } from "@/lib/matchaLogic";

import { useQuiz } from "./QuizProvider";

const STEP_TITLE: Record<Step, string> = {
  experience: "Pengenalan",
  dietary: "Preferensi",
  texture: "Tekstur",
  flavor: "Flavor Profile",
};

export default function GameHUD() {
  const {
    progress,
    currentStep,
  } = useQuiz();

  return (
    <header className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Matcha Quest
            </p>

            <p className="mt-1 text-sm text-neutral-500 truncate">
              {STEP_TITLE[currentStep]}
            </p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {["A", "S", "D"].map((key) => (
              <kbd
                key={key}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-300 bg-white text-sm font-semibold shadow-sm"
              >
                {key}
              </kbd>
            ))}

            <div className="h-5 w-px bg-neutral-300" />

            <kbd className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold shadow-sm">
              ENTER
            </kbd>
          </div>
        </div>

        <div className="overflow-hidden rounded-full bg-neutral-200">
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.4,
            }}
            className="h-2 rounded-full bg-brand-500"
          />
        </div>

        <p className="text-right text-xs font-medium text-brand-600">
          {Math.round(progress)}%
        </p>
      </div>
    </header>
  );
}