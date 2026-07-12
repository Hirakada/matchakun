export type QuizStep =
  | "Experience"
  | "Dietary"
  | "Texture"
  | "Flavor";

export interface QuizOption {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;

  hotkey: "A" | "S" | "D";
}

export interface QuizQuestion {
  id: QuizStep;

  title: string;

  description: string;

  options: [
    QuizOption,
    QuizOption,
    QuizOption
  ];
}

export const MATCHA_QUESTIONS: QuizQuestion[] = [
  {
    id: "Experience",

    title: "How well do you know Matcha?",

    description:
      "Choose the lane that best describes you.",

    options: [
      {
        id: "beginner",

        title: "Newbie",

        subtitle: "First time trying",

        emoji: "🌱",

        hotkey: "A",
      },

      {
        id: "casual",

        title: "Casual",

        subtitle: "Drink occasionally",

        emoji: "🍵",

        hotkey: "S",
      },

      {
        id: "enthusiast",

        title: "Enthusiast",

        subtitle: "True matcha lover",

        emoji: "💚",

        hotkey: "D",
      },
    ],
  },

  {
    id: "Dietary",

    title: "Do you have any dietary preferences?",

    description:
      "We'll adjust the recommendation for you.",

    options: [
      {
        id: "none",

        title: "No Preference",

        subtitle: "Everything is fine",

        emoji: "✅",

        hotkey: "A",
      },

      {
        id: "no_oat",

        title: "Avoid Oat",

        subtitle: "No oat milk",

        emoji: "🌾",

        hotkey: "S",
      },

      {
        id: "skip",

        title: "Skip",

        subtitle: "Not sure",

        emoji: "❔",

        hotkey: "D",
      },
    ],
  },

  {
    id: "Texture",

    title: "Which texture do you enjoy?",

    description:
      "Select your favorite mouthfeel.",

    options: [
      {
        id: "clean",

        title: "Pure",

        subtitle: "Clean & smooth",

        emoji: "🍃",

        hotkey: "A",
      },

      {
        id: "creamy_smooth",

        title: "Creamy",

        subtitle: "Rich & silky",

        emoji: "🥛",

        hotkey: "S",
      },

      {
        id: "creamy_fresh",

        title: "Cold Whisk",

        subtitle: "Light & refreshing",

        emoji: "❄️",

        hotkey: "D",
      },
    ],
  },

  {
    id: "Flavor",

    title: "What flavor profile do you prefer?",

    description:
      "Every matcha has its own personality.",

    options: [
      {
        id: "nutty_creamy",

        title: "Nutty",

        subtitle: "Sweet & creamy",

        emoji: "🤎",

        hotkey: "A",
      },

      {
        id: "balanced",

        title: "Balanced",

        subtitle: "Easy to enjoy",

        emoji: "🌿",

        hotkey: "S",
      },

      {
        id: "umami_bold",

        title: "Umami",

        subtitle: "Bold & intense",

        emoji: "🌊",

        hotkey: "D",
      },
    ],
  },
];