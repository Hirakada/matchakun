"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { MATCHA_QUESTIONS } from "@/data/matchaQuestions";
import { calculateRecommendation, QuizAnswers } from "@/lib/matchaGame";
import { MatchaProductId } from "@/data/matchaMenu";

type Screen = "intro" | "playing" | "result";

interface QuizContextValue {
  screen: Screen;

  currentQuestion: number;
  totalQuestions: number;

  selectedLane: number;

  answers: QuizAnswers;

  progress: number;

  resultId: MatchaProductId | null;

  isAnimating: boolean;

  question: (typeof MATCHA_QUESTIONS)[number];

  startGame: () => void;

  moveLeft: () => void;
  moveCenter: () => void;
  moveRight: () => void;

  selectLane: (lane: number) => void;

  confirmSelection: (lane?: number) => void;

  restart: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(
  null
);

export function QuizProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [screen, setScreen] =
    useState<Screen>("intro");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedLane, setSelectedLane] =
    useState(1);

  const [answers, setAnswers] =
    useState<QuizAnswers>({});

  const [isAnimating, setIsAnimating] =
    useState(false);

  const question =
    MATCHA_QUESTIONS[currentQuestion];

  const totalQuestions =
    MATCHA_QUESTIONS.length;

  const progress =
    ((currentQuestion + 1) /
      totalQuestions) *
    100;

  const resultId = useMemo(() => {
    if (screen !== "result") {
      return null;
    }

    return calculateRecommendation(answers);
  }, [answers, screen]);

  function startGame() {
    setScreen("playing");
  }

  function moveLeft() {
    if (isAnimating) return;

    setSelectedLane(0);
  }

  function moveCenter() {
    if (isAnimating) return;

    setSelectedLane(1);
  }

  function moveRight() {
    if (isAnimating) return;

    setSelectedLane(2);
  }

  function selectLane(lane: number) {
    if (isAnimating) return;

    setSelectedLane(lane);
  }

  function confirmSelection(
    lane = selectedLane
  ) {
    if (isAnimating) return;

    const option =
      question.options[lane];

    if (!option) return;

    setIsAnimating(true);

    setAnswers((previous) => ({
      ...previous,
      [question.id]: option.id,
    }));

    window.setTimeout(() => {
      const isLastQuestion =
        currentQuestion ===
        totalQuestions - 1;

      if (isLastQuestion) {
        setScreen("result");
      } else {
        setCurrentQuestion(
          (previous) => previous + 1
        );

        setSelectedLane(1);
      }

      setIsAnimating(false);
    }, 350);
  }

  function restart() {
    setScreen("intro");

    setCurrentQuestion(0);

    setSelectedLane(1);

    setAnswers({});

    setIsAnimating(false);
  }

  return (
    <QuizContext.Provider
      value={{
        screen,

        currentQuestion,
        totalQuestions,

        selectedLane,

        answers,

        progress,

        resultId,

        isAnimating,

        question,

        startGame,

        moveLeft,
        moveCenter,
        moveRight,

        selectLane,

        confirmSelection,

        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(
      "useQuiz must be used inside QuizProvider."
    );
  }

  return context;
}