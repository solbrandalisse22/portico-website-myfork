import animations from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
      },
      colors: {
        background: "rgb(21 26 54)",
        primary: "rgb(183 228 253);",
        secondary: "rgb(0, 171, 218, 0.973);",
        black:"rgb(0,0,0)",
        footer: "rgb(10 12 31)",
      },
      boxShadow: {
        'glass': '0 4px 2px -2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    }
  },
  plugins: [
    animations,
    ({ addComponents }) => {
      addComponents({
        ".cp-v": {
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 50% 100%, 0 85%)",
        },
        ".cp-elipse": {
          clipPath: "ellipse(100% 55% at 48% 44%)",
        },
      });
    },
  ],
};