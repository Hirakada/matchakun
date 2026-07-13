"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  MATCHA_QUESTIONS,
} from "@/data/matchaQuestions";

import {
  getNextStep,
  STEP_KEY,
  STEP_MAP,
  getProgress,
} from "@/lib/questFlow";

import {
  calculateRecommendation,
} from "@/lib/questRecommendation";

import type {
  QuizAnswers,
  RecommendationResult,
  Step,
} from "@/lib/questTypes";

type Screen = "intro" | "playing" | "result";

interface QuizContextValue {
  screen: Screen;

  currentStep: Step;

  selectedLane: number;

  answers: QuizAnswers;

  progress: number;

  recommendation: RecommendationResult | null;

  isAnimating: boolean;

  question: (typeof MATCHA_QUESTIONS)[keyof typeof MATCHA_QUESTIONS];

  startGame: () => void;

  moveLeft: () => void;
  moveCenter: () => void;
  moveRight: () => void;

  selectLane: (lane: number) => void;

  confirmSelection: (lane?: number) => void;

  restart: () => void;
}

const QuizContext =
  createContext<QuizContextValue | null>(null);

export function QuizProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [screen, setScreen] =
    useState<Screen>("intro");

  const [currentStep, setCurrentStep] =
    useState<Step>("experience");

  const [selectedLane, setSelectedLane] =
    useState(1);

  const [answers, setAnswers] =
    useState<QuizAnswers>({});

  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const currentQuestion =
    STEP_MAP[currentStep];

  const question =
    MATCHA_QUESTIONS[currentQuestion];

  const progress =
    getProgress(
      currentStep,
      answers
    ).percentage;

  function startGame() {
    setScreen("playing");
  }

  function moveTo(
    lane: 0 | 1 | 2
  ) {
    if (isAnimating) return;

    setSelectedLane(lane);
  }

  const moveLeft = () => moveTo(0);

  const moveCenter = () => moveTo(1);

  const moveRight = () => moveTo(2);

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

    const nextAnswers = {
      ...answers,
      [STEP_KEY[question.id]]:
        option.id,
    } as QuizAnswers;

    setAnswers(nextAnswers);

    window.setTimeout(() => {
      const nextStep =
        getNextStep(
          currentStep,
          nextAnswers
        );

      if (nextStep === "result") {
        setRecommendation(
          calculateRecommendation(nextAnswers)
        );

        setScreen("result");
      } else {
        setCurrentStep(nextStep);

        setSelectedLane(1);
      }

      setIsAnimating(false);
    }, 350);
  }

  function restart() {
    setCurrentStep("experience");

    setSelectedLane(1);

    setAnswers({});

    setRecommendation(null);

    setIsAnimating(false);

    setScreen("intro");
  }

  return (
    <QuizContext.Provider
      value={{
        screen,

        question,

        currentStep,

        progress,

        answers,

        recommendation,

        selectedLane,

        isAnimating,

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
  const context =
    useContext(QuizContext);

  if (!context) {
    throw new Error(
      "useQuiz must be used inside QuizProvider."
    );
  }

  return context;
}