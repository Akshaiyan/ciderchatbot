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
        ci: {
          red: "#852d2d",
          "red-dark": "#691616",
          "red-light": "#f7f0f0",
          "red-muted": "#b5696a",
          green: "#56876a",
          gold: "#c0a052",
          body: "#3d3d3d",
          muted: "#7c7c7c",
          cream: "#faf8f4",
          border: "#e0d8d0",
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "Arial", "sans-serif"],
        body: ["var(--font-lato)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
