import type { Config } from "tailwindcss";
 
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        reveal: {
          to: { color: "#171717" }, // neutral-900
        },
      },
      animation: {
        reveal: "reveal 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
 
export default config;
