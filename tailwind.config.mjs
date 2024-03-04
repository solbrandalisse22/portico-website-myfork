import animations from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        tomaso: ["Tomaso", "sans-serif"],
        jura: ["Jura", "sans-serif"],
      },
      colors: {
        background: "rgb(21 26 54)",
        primary: "rgb(183 228 253);",
        secondary: "rgb(60 160 215);",
        footer: "rgb(10 12 31)",
      },
    },
  },
  plugins: [
    animations,
    ({ addComponents }) => {
      addComponents({
        ".cp-v": {
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 50% 100%, 0 85%)",
        },
      });
    },
  ],
};
