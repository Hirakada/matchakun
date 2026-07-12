import {
  MatchaBase,
  MatchaPowder,
  MatchaProductId,
  getMatchaProduct,
} from "@/data/matchaMenu";

export interface QuizAnswers {
  experience?: string;
  dietary?: string;
  texture?: string;
  flavor?: string;
}

function recommendPowder(
  answers: QuizAnswers
): MatchaPowder["id"] {
  switch (answers.experience) {
    case "beginner":
      return "kaze";

    case "casual":
      return "nami";

    case "enthusiast":
      return "roku";

    default:
      return "kaze";
  }
}

function recommendBase(
  answers: QuizAnswers
): MatchaBase["id"] {
  switch (answers.texture) {
    case "clean":
      return "usucha";

    case "creamy_smooth":
      return "latte";

    case "creamy_fresh":
      return "coldwhisk";

    default:
      return "latte";
  }
}

export function calculateRecommendation(
  answers: QuizAnswers
): MatchaProductId {
  const powder = recommendPowder(answers);

  const base = recommendBase(answers);

  const product = getMatchaProduct(powder, base);

  if (!product) {
    throw new Error("Unable to generate recommendation.");
  }

  return product.id;
}