"use client";

import { useMemo, useState } from "react";
import { MATCHA_QUESTIONS } from "@/data/matchaQuestions";
import {
  calculateRecommendation,
  QuizAnswers,
} from "@/lib/matchaGame";

export function useMatchaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<QuizAnswers>({});

  const [selectedLane, setSelectedLane] = useState(1);

  const [isAnimating, setIsAnimating] = useState(false);

  const [isFinished, setIsFinished] = useState(false);

  const question = MATCHA_QUESTIONS[currentQuestion];

  const progress = useMemo(() => {
    return ((currentQuestion + 1) / MATCHA_QUESTIONS.length) * 100;
  }, [currentQuestion]);

  const resultId = useMemo(() => {
    if (!isFinished) return null;

    return calculateRecommendation(answers);
  }, [answers, isFinished]);

  function moveLeft() {
    if (isAnimating) return;

    setSelectedLane((prev) => Math.max(0, prev - 1));
  }

  function moveRight() {
    if (isAnimating) return;

    setSelectedLane((prev) => Math.min(2, prev + 1));
  }

  function moveCenter() {
    if (isAnimating) return;

    setSelectedLane(1);
  }

  function confirmSelection() {
    if (isAnimating) return;

    const option = question.options[selectedLane];

    if (!option) return;

    setIsAnimating(true);

    const nextAnswers = {
      ...answers,
      [question.id]: option.id,
    };

    setAnswers(nextAnswers);

    setTimeout(() => {
      if (currentQuestion >= MATCHA_QUESTIONS.length - 1) {
        setIsFinished(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedLane(1);
      }

      setIsAnimating(false);
    }, 400);
  }

  function restart() {
    setAnswers({});
    setCurrentQuestion(0);
    setSelectedLane(1);
    setIsFinished(false);
    setIsAnimating(false);
  }

  return {
    question,

    progress,

    answers,

    resultId,

    isFinished,

    currentQuestion,

    totalQuestions: MATCHA_QUESTIONS.length,

    selectedLane,

    isAnimating,

    moveLeft,

    moveCenter,

    moveRight,

    confirmSelection,

    restart,
  };
}