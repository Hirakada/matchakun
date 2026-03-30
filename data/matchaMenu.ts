export type MatchaItem = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
};

export const matchaMenu: MatchaItem[] = [
  {
    id: "usucha",
    name: "Usucha",
    description:
      "Matcha tradisional yang disajikan ringan dengan campuran matcha dan air, menghasilkan rasa yang halus, bersih, dan autentik.",
    ingredients: ["Matcha", "Air"],
    image: "/images/usucha.png",
  },
  {
    id: "latte",
    name: "Matcha Latte",
    description:
      "Perpaduan matcha, susu, dan air yang menciptakan rasa creamy, lembut, dan lebih ramah bagi penikmat matcha modern.",
    ingredients: ["Matcha", "Susu", "Air"],
    image: "/images/latte.png",
  },
  {
    id: "cold",
    name: "Cold Whisk",
    description:
      "Matcha yang dikocok dengan susu dalam sajian dingin, memberikan sensasi segar dengan rasa yang tetap kuat dan creamy.",
    ingredients: ["Matcha", "Susu"],
    image: "/images/cold.png",
  },
];