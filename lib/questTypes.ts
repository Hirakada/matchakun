import { MatchaProductId } from "@/data/matchaMenu";

export type Step =
  | "experience"
  | "dietary"
  | "texture"
  | "flavor";

export type BrewType =
  | "usucha"
  | "latte"
  | "coldwhisk";

export type PowderType =
  | "kaze"
  | "roku"
  | "nami";

export type ExperienceAnswer =
  | "beginner"
  | "casual"
  | "enthusiast";

export type DietaryAnswer =
  | "none"
  | "no_oat"
  | "skip";

export type TextureAnswer =
  | "clean"
  | "creamy_smooth"
  | "creamy_fresh";

export type FlavorAnswer =
  | "nutty_creamy"
  | "balanced"
  | "umami_bold";

export interface QuizAnswers {
  experience?: ExperienceAnswer;
  dietary?: DietaryAnswer;
  texture?: TextureAnswer;
  flavor?: FlavorAnswer;
}

export interface BrewScore {
  usucha: number;

  latte: number;

  coldwhisk: number;
}

export interface PowderScore {
  kaze: number;
  roku: number;
  nami: number;
}

export interface RecommendationResult {

  id: MatchaProductId;
  brew: BrewType;
  powder: PowderType;
  brewScore: BrewScore;
  powderScore: PowderScore;
  reasons: string[];
  confidence: number;
}

export interface RecommendationContent {
  title: string;
  description: string;
  tips: string[];
  reasons: string[];
}