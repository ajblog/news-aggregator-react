import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx", // 👈 Make sure all components are scanned
  ],
  theme: {
    extend: {
      colors: {
        testcolor: "#03e3fc",
      },
    },
  },
  plugins: [],
};

export default config;
