"use client";

import { motion } from "framer-motion";

import { useQuiz } from "./QuizProvider";

export default function QuestionCard() {
  const {
    question,
  } = useQuiz();

  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto flex w-full flex-col py-4"
    >

      <div className="flex gap-4 flex-col rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-100 text-xs font-semibold text-brand-700 sm:text-sm">
            {question.id}
          </span>
        </div>

        <h1
          className="
            font-heading
            leading-tight
            text-neutral-black
            text-[clamp(1.75rem,4vw,3.75rem)]
          "
        >
          {question.title}
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
          {question.description}
        </p>
      </div>
    </motion.section>
  );
}