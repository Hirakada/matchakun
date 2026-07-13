import { QuizStep } from "@/data/matchaQuestions";

import {
  QuizAnswers,
  Step,
} from "./questTypes";

export const STEP_MAP: Record<
  Step,
  QuizStep
> = {
  experience: "Experience",
  dietary: "Dietary",
  texture: "Texture",
  flavor: "Flavor",
};

export const STEP_KEY: Record<
  QuizStep,
  Step
> = {
  Experience: "experience",
  Dietary: "dietary",
  Texture: "texture",
  Flavor: "flavor",
};

type NextStep = Step | "result";

const FLOW: Record<
  Step,
  (answers: QuizAnswers) => NextStep
> = {
  experience: () => "dietary",

  dietary: (answers) =>
    answers.dietary === "no_oat"
      ? "flavor"
      : "texture",

  texture: () => "flavor",

  flavor: () => "result",
};

export function getNextStep(
  current: Step,
  answers: QuizAnswers
): NextStep {
  return FLOW[current](answers);
}

export function getPreviousStep(
  current: Step,
  answers: QuizAnswers
): Step {
  switch (current) {
    case "dietary":
      return "experience";

    case "texture":
      return "dietary";

    case "flavor":
      return answers.dietary === "no_oat"
        ? "dietary"
        : "texture";

    default:
      return "experience";
  }
}

const NORMAL_PROGRESS: Record<
  Step,
  number
> = {
  experience: 0,
  dietary: 1,
  texture: 2,
  flavor: 3,
};

const NO_OAT_PROGRESS = {
  experience: 0,
  dietary: 1,
  flavor: 2,
} as const;

export function getProgress(
  current: Step,
  answers: QuizAnswers
) {
  const total =
    answers.dietary === "no_oat"
      ? 3
      : 4;

  const index =
    answers.dietary === "no_oat"
      ? current === "texture"
        ? 2
        : NO_OAT_PROGRESS[
            current as keyof typeof NO_OAT_PROGRESS
          ]
      : NORMAL_PROGRESS[current];

  return {
    current: index + 1,
    total,
    percentage:
      ((index + 1) / total) * 100,
  };
}