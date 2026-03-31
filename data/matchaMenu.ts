const IMAGE_VERSION = "1";
// BASE TYPE
export type MatchaBase = {
  id: "usucha" | "latte" | "cold";
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  price: number;
};

// BREWING MENU

export const matchaMenu: MatchaBase[] = [

  {
    id: "usucha",
    name: "Usucha",
    description:
      "Matcha tradisional yang disajikan ringan dengan campuran matcha dan air, menghasilkan rasa yang halus, bersih, dan autentik.",
    ingredients: ["Matcha", "Air"],
    image: `/images/usucha.png?v=${IMAGE_VERSION}`,
    price: 0,
  },
  {
    id: "latte",
    name: "Matcha Latte",
    description:
      "Perpaduan matcha, susu oat, dan air yang menciptakan rasa creamy, lembut, dan lebih ramah bagi penikmat matcha modern.",
    ingredients: ["Matcha", "Susu Oat", "Air"],
    image: `/images/latte.png?v=${IMAGE_VERSION}`,
    price: 10000,
  },
  {
    id: "cold",
    name: "Cold Whisk",
    description:
      "Matcha yang dikocok dengan susu oat dalam sajian dingin, memberikan sensasi segar dengan rasa yang tetap kuat dan creamy.",
    ingredients: ["Matcha", "Susu Oat"],
    image: `/images/cold.png?v=${IMAGE_VERSION}`,
    price: 15000,
  },
];

// POWDER TYPE

export type MatchaPowder = {
  id: "kaze" | "nami" | "ajisai";
  name: string;
  description: string;
  notes: string[];
  price: number;
};

// POWDER DATA

export const matchaPowders: MatchaPowder[] = [
  {
    id: "kaze",
    name: "Kaze",
    description: "Light, nutty, dan creamy — cocok untuk pemula.",
    notes: ["Nutty", "Aromatic", "Creamy"],
    price: 15000,
  },
  {
    id: "nami",
    name: "Nami",
    description: "Umami kuat dengan karakter seaweed yang khas.",
    notes: ["Nutty", "Umami", "Seaweed"],
    price: 20000,
  },
  {
    id: "ajisai",
    name: "Ajisai",
    description: "Balanced, creamy, dan umami — paling premium.",
    notes: ["Nutty", "Umami", "Creamy", "Balanced"],
    price: 28000,
  },
];

// PRODUCT ID

export type MatchaProductId =
  | "kaze_usucha"
  | "kaze_latte"
  | "kaze_cold"
  | "nami_usucha"
  | "nami_latte"
  | "nami_cold"
  | "ajisai_usucha"
  | "ajisai_latte"
  | "ajisai_cold";

// FINAL PRODUCT TYPE

export type MatchaProduct = {
  id: MatchaProductId;
  name: string;
  base: MatchaBase;
  powder: MatchaPowder;
  price: number;
};

// GENERATOR

export function generateMatchaProducts(): MatchaProduct[] {
  return matchaPowders.flatMap((powder) =>
    matchaMenu.map((base) => ({
      id: `${powder.id}_${base.id}` as MatchaProductId,
      name: `${powder.name} ${base.name}`,
      base,
      powder,
      price: base.price + powder.price,
    }))
  );
}

// CACHE (IMMUTABLE)

const productsCache = Object.freeze(generateMatchaProducts());

// HELPERS

export function getMatchaProductById(id: MatchaProductId) {
  return productsCache.find((p) => p.id === id);
}

export function getMatchaProduct(
  powderId: MatchaPowder["id"],
  baseId: MatchaBase["id"]
) {
  return productsCache.find(
    (p) => p.powder.id === powderId && p.base.id === baseId
  );
}

export function getMatchaLabel(id: MatchaProductId) {
  const product = getMatchaProductById(id);
  return product?.name ?? "";
}

// ==============================
// FORMAT PRICE (IDR)
// ==============================

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getReadablePrice(id: MatchaProductId) {
  const product = getMatchaProductById(id);
  return product ? formatRupiah(product.price) : "";
}