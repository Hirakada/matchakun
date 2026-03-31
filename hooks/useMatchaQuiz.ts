"use client";

import { useState } from "react";
import {
  Step,
  QuizAnswers,
  getNextStep,
  getPrevStep,
  getRecommendationId,
} from "@/lib/matchaQuiz";

export function useMatchaQuiz() {
  const [step, setStep] = useState<Step>("experience");
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const next = () => setStep(getNextStep(step));
  const back = () => setStep(getPrevStep(step));

  const setAnswer = <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const select = <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswer(key, value);
    next();
  };

  const resultId = getRecommendationId(answers);

  return {
    step,
    answers,
    setAnswer,
    select,
    next,
    back,
    setStep,
    resultId,
  };
}