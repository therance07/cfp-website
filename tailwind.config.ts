import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        "#F26522",
        "primary-dark": "#D4541A",
        secondary:      "#2E7D1F",
        "secondary-light": "#4CAF30",
        dark:           "#1A0F00",
        cream:          "#FFF8F0",
        "gray-light":   "#F5F5F5",
        "cfp-text":     "#2D2D2D",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        nunito:     ["var(--font-nunito)", "Nunito Sans", "sans-serif"],
        barlow:     ["var(--font-barlow)", "Barlow Condensed", "sans-serif"],
        heading:    ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        body:       ["var(--font-nunito)", "Nunito Sans", "sans-serif"],
        label:      ["var(--font-barlow)", "Barlow Condensed", "sans-serif"],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up":    "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
