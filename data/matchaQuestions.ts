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
  options: [QuizOption, QuizOption, QuizOption];
}

export const MATCHA_QUESTIONS: Record<
  QuizStep,
  QuizQuestion
> = {
  Experience: {
    id: "Experience",

    title: "Seberapa familiar kamu dengan Matcha?",

    description:
      "Jawabanmu membantu kami memberikan rekomendasi yang lebih sesuai.",

    options: [
      {
        id: "beginner",

        title: "Baru Pertama Kali",

        subtitle:
          "Belum pernah atau baru ingin mencoba Matcha.",

        emoji: "🌱",

        hotkey: "A",
      },

      {
        id: "casual",

        title: "Sesekali Menikmati",

        subtitle:
          "Sesekali menikmati Matcha dan ingin mencoba lebih banyak.",

        emoji: "🍵",

        hotkey: "S",
      },

      {
        id: "enthusiast",

        title: "Pecinta Matcha",

        subtitle:
          "Sudah terbiasa menikmati berbagai karakter Matcha.",

        emoji: "💚",

        hotkey: "D",
      },
    ],
  },

  Dietary: {
    id: "Dietary",

    title: "Apakah kamu memiliki preferensi tertentu?",

    description:
      "Kami akan menyesuaikan rekomendasi sesuai kebutuhanmu.",

    options: [
      {
        id: "none",

        title: "Tidak Ada",

        subtitle:
          "Semua jenis minuman dapat direkomendasikan.",

        emoji: "✅",

        hotkey: "A",
      },

      {
        id: "no_oat",

        title: "Tanpa Oat Milk",

        subtitle:
          "Kami hanya akan merekomendasikan minuman tanpa oat milk.",

        emoji: "🌾",

        hotkey: "S",
      },

      {
        id: "skip",

        title: "Lewati",

        subtitle:
          "Belum memiliki preferensi khusus.",

        emoji: "❔",

        hotkey: "D",
      },
    ],
  },

  Texture: {
    id: "Texture",

    title:
      "Tekstur minuman seperti apa yang paling kamu sukai?",

    description:
      "Pilih sensasi minum yang paling sesuai dengan seleramu.",

    options: [
      {
        id: "clean",

        title: "Ringan & Murni",

        subtitle:
          "Segar, ringan, dan fokus pada rasa asli Matcha.",

        emoji: "🍃",

        hotkey: "A",
      },

      {
        id: "creamy_smooth",

        title: "Creamy & Lembut",

        subtitle:
          "Lembut, creamy, dan terasa lebih comforting.",

        emoji: "🥛",

        hotkey: "S",
      },

      {
        id: "creamy_fresh",

        title: "Creamy & Menyegarkan",

        subtitle:
          "Tetap creamy tetapi terasa lebih ringan dan refreshing.",

        emoji: "❄️",

        hotkey: "D",
      },
    ],
  },

  Flavor: {
    id: "Flavor",

    title:
      "Rasa seperti apa yang paling kamu sukai?",

    description:
      "Pilih karakter rasa yang paling sesuai dengan seleramu.",

    options: [
      {
        id: "nutty_creamy",

        title: "Lembut & Sedikit Manis",

        subtitle:
          "Rasa ringan, creamy, dan mudah dinikmati.",

        emoji: "🤎",

        hotkey: "A",
      },

      {
        id: "balanced",

        title: "Seimbang & Segar",

        subtitle:
          "Perpaduan rasa Matcha yang pas dan mudah disukai.",

        emoji: "🌿",

        hotkey: "S",
      },

      {
        id: "umami_bold",

        title: "Kuat & Autentik",

        subtitle:
          "Karakter Matcha yang lebih pekat, kompleks, dan berani.",

        emoji: "🌊",

        hotkey: "D",
      },
    ],
  },
};