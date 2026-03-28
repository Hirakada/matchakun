import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: "#8DBE4F",
          500: "#4F7F2F",
          700: "#2F5D2E",
        },
        cream: {
          100: "#F4F1E8",
        },
        neutral: {
          white: "#FEFEFE",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#CFCFCF",
          black: "#1F2A1F",
        },
      },

      fontSize: {
        h1: ["48px", "56px"],
        h2: ["36px", "44px"],
        h3: ["28px", "36px"],
        body: ["16px", "24px"],
        "body-sm": ["14px", "20px"],
        label: ["12px", "16px"],
        caption: ["12px", "16px"],
        button: ["14px", "16px"],
      },

      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-baloo)"],
      },

      boxShadow: {
        sm: "0 2px 4px rgba(0,0,0,0.06)",
        lg: "0 2px 24px rgba(0,0,0,0.12)",
        inner: "inset 0 2px 4px rgba(0,0,0,0.08)",
      },

      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;