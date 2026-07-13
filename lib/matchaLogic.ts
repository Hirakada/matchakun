import { MatchaProductId } from "@/data/matchaMenu";

export type Step =
  | "experience"
  | "dietary"
  | "texture"
  | "flavor";

export type QuizAnswers = {
  experience?: "beginner" | "casual" | "enthusiast";
  dietary?: "none" | "no_oat" | "skip";
  texture?: "clean" | "creamy_smooth" | "creamy_fresh";
  flavor?: "nutty_creamy" | "balanced" | "umami_bold";
};

/* -------------------------------------------------------------------------- */
/*                               STEP MAPPING                                 */
/* -------------------------------------------------------------------------- */

export const STEP_MAP = {
  experience: "Experience",
  dietary: "Dietary",
  texture: "Texture",
  flavor: "Flavor",
} as const;

export const STEP_KEY = {
  Experience: "experience",
  Dietary: "dietary",
  Texture: "texture",
  Flavor: "flavor",
} as const;

/* -------------------------------------------------------------------------- */
/*                                 FLOW                                       */
/* -------------------------------------------------------------------------- */

const FLOW: Record<
  Step,
  (answers: QuizAnswers) => Step | "result"
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
): Step | "result" {
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

/* -------------------------------------------------------------------------- */
/*                         BREW RECOMMENDATION                                */
/* -------------------------------------------------------------------------- */

function recommendBrew(
  answers: QuizAnswers
): "usucha" | "latte" | "coldwhisk" {
  if (answers.dietary === "no_oat") {
    return "usucha";
  }

  switch (answers.texture) {
    case "clean":
      return "usucha";

    case "creamy_smooth":
      return "latte";

    case "creamy_fresh":
      return "coldwhisk";
  }

  switch (answers.experience) {
    case "beginner":
      return "latte";

    case "enthusiast":
      return "usucha";

    default:
      return "latte";
  }
}

/* -------------------------------------------------------------------------- */
/*                        POWDER RECOMMENDATION                               */
/* -------------------------------------------------------------------------- */

function recommendPowder(
  answers: QuizAnswers
): "kaze" | "roku" | "nami" {
  switch (answers.flavor) {
    case "nutty_creamy":
      return "kaze";

    case "balanced":
      return "roku";

    case "umami_bold":
      return "nami";
  }

  switch (answers.experience) {
    case "beginner":
      return "kaze";

    case "enthusiast":
      return "nami";

    default:
      return "roku";
  }
}

/* -------------------------------------------------------------------------- */
/*                        FINAL RECOMMENDATION                                */
/* -------------------------------------------------------------------------- */

export function calculateRecommendation(
  answers: QuizAnswers
): MatchaProductId {
  const brew = recommendBrew(answers);
  const powder = recommendPowder(answers);

  return `${powder}_${brew}` as MatchaProductId;
}

/* -------------------------------------------------------------------------- */
/*                              RESULT NOTE                                   */
/* -------------------------------------------------------------------------- */

export function getRecommendationNote(
  answers: QuizAnswers
): string {
  if (answers.dietary === "no_oat") {
    return "Karena kamu memilih tanpa oat milk, kami merekomendasikan Usucha agar tetap menikmati karakter asli Matcha.";
  }

  if (answers.experience === "beginner") {
    return "Pilihan ini cocok untuk memulai perjalananmu menikmati Matcha.";
  }

  if (answers.experience === "enthusiast") {
    return "Pilihan ini menonjolkan karakter Matcha yang lebih autentik dan kompleks.";
  }

  return "Rekomendasi ini dipilih berdasarkan preferensi yang kamu berikan.";
}