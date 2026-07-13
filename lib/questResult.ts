import { RecommendationResult } from "./questTypes";

export interface QuestResult {
  title: string;

  badge: string;

  headline: string;

  description: string;

  reasons: string[];

  tips: string[];

  cta: string;
}

/* -------------------------------------------------------------------------- */
/*                              RESULT CONTENT                                */
/* -------------------------------------------------------------------------- */

export function getQuestResult(
  recommendation: RecommendationResult
): QuestResult {
  return {
    title: buildTitle(recommendation),

    badge: "MATCH FOUND",

    headline: buildHeadline(recommendation),

    description:
      buildDescription(recommendation),

    reasons: buildReasons(recommendation),

    tips: buildTips(recommendation),

    cta: "Siap mencoba rekomendasi ini?",
  };
}

/* -------------------------------------------------------------------------- */
/*                               TITLE                                         */
/* -------------------------------------------------------------------------- */

function buildTitle(
  recommendation: RecommendationResult
) {
  return `${capitalize(
    recommendation.powder
  )} ${formatBrew(recommendation.brew)}`;
}

/* -------------------------------------------------------------------------- */
/*                              HEADLINE                                       */
/* -------------------------------------------------------------------------- */

function buildHeadline(
  recommendation: RecommendationResult
) {
  if (
    recommendation.brew === "usucha"
  ) {
    return "Pilihan terbaik untuk menikmati karakter asli Matcha 🍃";
  }

  if (
    recommendation.brew === "latte"
  ) {
    return "Pilihan creamy yang lembut dan mudah dinikmati 🥛";
  }

  return "Pilihan creamy yang ringan dan menyegarkan ❄️";
}

/* -------------------------------------------------------------------------- */
/*                             DESCRIPTION                                     */
/* -------------------------------------------------------------------------- */

function buildDescription(
  recommendation: RecommendationResult
) {
  const powder = getPowderDescription(
    recommendation.powder
  );

  const brew = getBrewDescription(
    recommendation.brew
  );

  return `${powder} ${brew}`;
}

/* -------------------------------------------------------------------------- */
/*                               REASONS                                       */
/* -------------------------------------------------------------------------- */

function buildReasons(
  recommendation: RecommendationResult
) {
  return recommendation.reasons;
}

/* -------------------------------------------------------------------------- */
/*                                 TIPS                                        */
/* -------------------------------------------------------------------------- */

function buildTips(
  recommendation: RecommendationResult
) {
  const tips: string[] = [];

  switch (recommendation.brew) {
    case "usucha":
      tips.push(
        "Nikmati perlahan agar perubahan aroma dan rasa Matcha lebih terasa."
      );
      break;

    case "latte":
      tips.push(
        "Aduk terlebih dahulu agar Matcha dan susu tercampur sempurna."
      );
      break;

    case "coldwhisk":
      tips.push(
        "Paling nikmat disajikan dingin untuk sensasi yang lebih menyegarkan."
      );
      break;
  }

  switch (recommendation.powder) {
    case "kaze":
      tips.push(
        "Jika mulai menyukai Matcha, cobalah Roku untuk karakter yang lebih kompleks."
      );
      break;

    case "roku":
      tips.push(
        "Roku cocok dinikmati baik sebagai Latte maupun Usucha."
      );
      break;

    case "nami":
      tips.push(
        "Jika ingin karakter Matcha yang paling autentik, cobalah juga Nami Usucha."
      );
      break;
  }

  return tips;
}

/* -------------------------------------------------------------------------- */
/*                             PRODUCT COPY                                    */
/* -------------------------------------------------------------------------- */

function getPowderDescription(
  powder: string
) {
  switch (powder) {
    case "kaze":
      return "Kaze menghadirkan karakter Matcha yang lembut, ringan, dan mudah dinikmati.";

    case "roku":
      return "Roku menawarkan karakter rasa yang seimbang sehingga cocok untuk berbagai preferensi.";

    case "nami":
      return "Nami menghadirkan karakter umami yang kaya dengan rasa Matcha yang lebih autentik.";

    default:
      return "";
  }
}

function getBrewDescription(
  brew: string
) {
  switch (brew) {
    case "usucha":
      return "Disajikan tanpa susu sehingga karakter asli Matcha dapat dinikmati sepenuhnya.";

    case "latte":
      return "Dipadukan dengan oat milk untuk menghasilkan tekstur creamy yang lembut.";

    case "coldwhisk":
      return "Di-whisk bersama oat milk sehingga menghasilkan tekstur creamy yang tetap terasa ringan dan menyegarkan.";

    default:
      return "";
  }
}

/* -------------------------------------------------------------------------- */
/*                                HELPERS                                      */
/* -------------------------------------------------------------------------- */

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatBrew(text: string) {
  switch (text) {
    case "usucha":
      return "Usucha";

    case "coldwhisk":
      return "Cold Whisk";

    default:
      return "Latte";
  }
}