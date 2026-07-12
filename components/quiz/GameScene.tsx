"use client";

import { AnimatePresence } from "framer-motion";

import { QuizProvider, useQuiz } from "./QuizProvider";

import IntroScreen from "./IntroScreen";
import PlayingScreen from "./PlayingScreen";
import ResultScreen from "./ResultScreen";

function SceneRouter() {
  const { screen } = useQuiz();

  return (
    <AnimatePresence mode="wait">
      {screen === "intro" && (
        <IntroScreen key="intro" />
      )}

      {screen === "playing" && (
        <PlayingScreen key="playing" />
      )}

      {screen === "result" && (
        <ResultScreen key="result" />
      )}
    </AnimatePresence>
  );
}

export default function GameScene() {
  return (
    <QuizProvider>
      <section className="relative h-dvh overflow-hidden bg-gradient-to-br from-cream-100 via-brand-50 to-brand-100">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_65%)] pointer-events-none" />

        <div className="absolute inset-y-0 right-0 w-80 bg-[radial-gradient(circle_at_right,_rgba(59,130,246,0.18),_transparent_58%)] pointer-events-none" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6 ">
          <SceneRouter />
        </div>
      </section>
    </QuizProvider>
  );
}