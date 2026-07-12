import { MatchaProductId } from "@/data/matchaMenu";

export type Step =
  | "experience"
  | "dietary"
  | "texture"
  | "flavor"
  | "result";

export type QuizAnswers = {
  experience?: "beginner" | "casual" | "enthusiast";
  dietary?: "none" | "no_oat";
  texture?: "clean" | "creamy_smooth" | "creamy_fresh";
  flavor?: "nutty_creamy" | "umami_bold" | "balanced";
};

export const steps: Step[] = [
  "experience",
  "dietary",
  "texture",
  "flavor",
  "result",
];

export function getNextStep(current: Step): Step {
  const index = steps.indexOf(current);
  return steps[index + 1] ?? "result";
}

export function getPrevStep(current: Step): Step {
  const index = steps.indexOf(current);
  return steps[index - 1] ?? "experience";
}

export function getRecommendationId(
  answers: QuizAnswers
): MatchaProductId {
  let base: "usucha" | "latte" | "coldwhisk";

  if (answers.dietary === "no_oat") {
    base = "usucha";
  } else if (answers.texture === "clean") {
    base = "usucha";
  } else if (answers.texture === "creamy_smooth") {
    base = "latte";
  } else if (answers.texture === "creamy_fresh") {
    base = "coldwhisk";
  } else if (answers.experience === "beginner") {
    base = "latte";
  } else {
    base = "usucha";
  }

  let powder: "kaze" | "nami" | "roku";

  if (answers.flavor === "nutty_creamy") {
    powder = "kaze";
  } else if (answers.flavor === "umami_bold") {
    powder = "nami";
  } else if (answers.flavor === "balanced") {
    powder = "roku";
  } else if (answers.experience === "beginner") {
    powder = "kaze";
  } else if (answers.experience === "enthusiast") {
    powder = "nami";
  } else {
    powder = "roku";
  }

  return `${powder}_${base}` as MatchaProductId;
}

export function getRecommendationNote(answers: QuizAnswers) {
  if (answers.dietary === "no_oat") {
    return "Kami menggunakan oat milk untuk minuman creamy, jadi kami rekomendasikan pure matcha (Usucha) 🍃";
  }

  if (answers.experience === "beginner") {
    return "Pilihan ini cocok untuk kamu yang baru mulai menikmati matcha ✨";
  }

  if (answers.experience === "enthusiast") {
    return "Pilihan ini menonjolkan rasa matcha yang lebih bold 🍵";
  }

  return "";
}