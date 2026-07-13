import { MatchaProductId } from "@/data/matchaMenu";

import {
  BrewScore,
  BrewType,
  PowderScore,
  PowderType,
  QuizAnswers,
  RecommendationResult,
} from "./questTypes";

/* -------------------------------------------------------------------------- */
/*                              SCORE CONFIG                                  */
/* -------------------------------------------------------------------------- */

const BREW_SCORE = {
  experience: {
    beginner: {
      usucha: 0,
      latte: 2,
      coldwhisk: 1,
    },

    casual: {
      usucha: 1,
      latte: 1,
      coldwhisk: 2,
    },

    enthusiast: {
      usucha: 2,
      latte: 1,
      coldwhisk: 0,
    },
  },

  texture: {
    clean: {
      usucha: 5,
      latte: 0,
      coldwhisk: 0,
    },

    creamy_smooth: {
      usucha: 0,
      latte: 5,
      coldwhisk: 2,
    },

    creamy_fresh: {
      usucha: 0,
      latte: 2,
      coldwhisk: 5,
    },
  },
} as const;

const POWDER_SCORE = {
  experience: {
    beginner: {
      kaze: 2,
      roku: 1,
      nami: 0,
    },

    casual: {
      kaze: 1,
      roku: 2,
      nami: 1,
    },

    enthusiast: {
      kaze: 0,
      roku: 1,
      nami: 2,
    },
  },

  flavor: {
    nutty_creamy: {
      kaze: 5,
      roku: 2,
      nami: 0,
    },

    balanced: {
      kaze: 2,
      roku: 5,
      nami: 2,
    },

    umami_bold: {
      kaze: 0,
      roku: 2,
      nami: 5,
    },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                              SCORE HELPERS                                 */
/* -------------------------------------------------------------------------- */

function emptyBrewScore(): BrewScore {
  return {
    usucha: 0,
    latte: 0,
    coldwhisk: 0,
  };
}

function emptyPowderScore(): PowderScore {
  return {
    kaze: 0,
    roku: 0,
    nami: 0,
  };
}

/* -------------------------------------------------------------------------- */
/*                           BREW CALCULATION                                 */
/* -------------------------------------------------------------------------- */

function calculateBrewScore(
  answers: QuizAnswers
): BrewScore {
  /**
   * Hard Constraint
   *
   * Tanpa oat milk berarti hanya
   * Usucha yang dapat direkomendasikan.
   */
  if (answers.dietary === "no_oat") {
    return {
      usucha: 999,
      latte: -999,
      coldwhisk: -999,
    };
  }

  const score = emptyBrewScore();

  if (answers.experience) {
    const exp =
      BREW_SCORE.experience[
        answers.experience
      ];

    score.usucha += exp.usucha;
    score.latte += exp.latte;
    score.coldwhisk +=
      exp.coldwhisk;
  }

  if (answers.texture) {
    const texture =
      BREW_SCORE.texture[
        answers.texture
      ];

    score.usucha +=
      texture.usucha;

    score.latte +=
      texture.latte;

    score.coldwhisk +=
      texture.coldwhisk;
  }

  return score;
}

/* -------------------------------------------------------------------------- */
/*                          POWDER CALCULATION                                */
/* -------------------------------------------------------------------------- */

function calculatePowderScore(
  answers: QuizAnswers
): PowderScore {
  const score =
    emptyPowderScore();

  if (answers.experience) {
    const exp =
      POWDER_SCORE.experience[
        answers.experience
      ];

    score.kaze += exp.kaze;
    score.roku += exp.roku;
    score.nami += exp.nami;
  }

  if (answers.flavor) {
    const flavor =
      POWDER_SCORE.flavor[
        answers.flavor
      ];

    score.kaze +=
      flavor.kaze;

    score.roku +=
      flavor.roku;

    score.nami +=
      flavor.nami;
  }

  return score;
}

/* -------------------------------------------------------------------------- */
/*                            PICK BEST RESULT                                */
/* -------------------------------------------------------------------------- */

function pickBestBrew(
  score: BrewScore,
  answers: QuizAnswers
): BrewType {
  const sorted =
    Object.entries(score).sort(
      (a, b) => b[1] - a[1]
    );

  const [first, second] = sorted;

  /**
   * Tie breaker
   */
  if (
    second &&
    first[1] === second[1]
  ) {
    switch (
      answers.experience
    ) {
      case "beginner":
        return "latte";

      case "enthusiast":
        return "usucha";

      default:
        return "coldwhisk";
    }
  }

  return first[0] as BrewType;
}

function pickBestPowder(
  score: PowderScore
): PowderType {
  return (
    Object.entries(score).sort(
      (a, b) => b[1] - a[1]
    )[0][0] as PowderType
  );
}

/* -------------------------------------------------------------------------- */
/*                          CONFIDENCE SCORE                                  */
/* -------------------------------------------------------------------------- */

function calculateConfidence(
  brewScore: BrewScore,
  powderScore: PowderScore
): number {
  const bestBrew = Math.max(
    ...Object.values(brewScore)
  );

  const bestPowder = Math.max(
    ...Object.values(powderScore)
  );

  const confidence = Math.round(
    ((bestBrew + bestPowder) / 14) * 100
  );

  return Math.min(confidence, 100);
}

/* -------------------------------------------------------------------------- */
/*                              BUILD REASONS                                 */
/* -------------------------------------------------------------------------- */

function buildReasons(
  answers: QuizAnswers,
  brew: BrewType,
  powder: PowderType
): string[] {
  const reasons: string[] = [];

  /* --------------------------- Experience --------------------------- */

  switch (answers.experience) {
    case "beginner":
      reasons.push(
        "Kamu baru mulai mengenal Matcha sehingga kami memilih karakter yang lebih mudah dinikmati."
      );
      break;

    case "casual":
      reasons.push(
        "Kamu sudah cukup familiar dengan Matcha sehingga kami memilih karakter yang seimbang."
      );
      break;

    case "enthusiast":
      reasons.push(
        "Kamu sudah terbiasa menikmati Matcha sehingga kami memilih karakter yang lebih autentik."
      );
      break;
  }

  /* ----------------------------- Dietary ---------------------------- */

  if (answers.dietary === "no_oat") {
    reasons.push(
      "Karena kamu menghindari oat milk, kami hanya mempertimbangkan minuman tanpa susu."
    );
  }

  /* ----------------------------- Texture ---------------------------- */

  if (answers.dietary !== "no_oat") {
    switch (answers.texture) {
      case "clean":
        reasons.push(
          "Kamu menyukai minuman yang ringan dan fokus pada karakter asli Matcha."
        );
        break;

      case "creamy_smooth":
        reasons.push(
          "Kamu menyukai tekstur yang creamy, lembut, dan nyaman diminum."
        );
        break;

      case "creamy_fresh":
        reasons.push(
          "Kamu menyukai minuman yang creamy namun tetap terasa ringan dan menyegarkan."
        );
        break;
    }
  }

  /* ----------------------------- Flavor ----------------------------- */

  switch (answers.flavor) {
    case "nutty_creamy":
      reasons.push(
        "Kamu menyukai karakter rasa yang lembut dan mudah dinikmati."
      );
      break;

    case "balanced":
      reasons.push(
        "Kamu mencari karakter rasa yang seimbang."
      );
      break;

    case "umami_bold":
      reasons.push(
        "Kamu menyukai karakter Matcha yang kuat dan autentik."
      );
      break;
  }

  /* ---------------------- Recommendation Result --------------------- */

  switch (powder) {
    case "kaze":
      reasons.push(
        "Kaze dipilih karena memiliki karakter yang ringan dan approachable."
      );
      break;

    case "roku":
      reasons.push(
        "Roku dipilih karena menawarkan karakter rasa yang paling seimbang."
      );
      break;

    case "nami":
      reasons.push(
        "Nami dipilih karena memiliki karakter umami yang kaya dan autentik."
      );
      break;
  }

  switch (brew) {
    case "usucha":
      reasons.push(
        "Usucha menjadi pilihan terbaik untuk menikmati karakter asli Matcha."
      );
      break;

    case "latte":
      reasons.push(
        "Latte dipilih untuk memberikan tekstur creamy yang lembut dan nyaman."
      );
      break;

    case "coldwhisk":
      reasons.push(
        "Cold Whisk dipilih karena memberikan sensasi creamy yang tetap ringan dan menyegarkan."
      );
      break;
  }

  return reasons;
}

/* -------------------------------------------------------------------------- */
/*                       FINAL RECOMMENDATION                                 */
/* -------------------------------------------------------------------------- */

export function calculateRecommendation(
  answers: QuizAnswers
): RecommendationResult {
  const brewScore =
    calculateBrewScore(answers);

  const powderScore =
    calculatePowderScore(answers);

  const brew =
    pickBestBrew(
      brewScore,
      answers
    );

  const powder =
    pickBestPowder(powderScore);

  const confidence =
    calculateConfidence(
      brewScore,
      powderScore
    );

  const reasons =
    buildReasons(
      answers,
      brew,
      powder
    );

  return {
    id: `${powder}_${brew}` as MatchaProductId,

    brew,

    powder,

    brewScore,

    powderScore,

    confidence,

    reasons,
  };
}