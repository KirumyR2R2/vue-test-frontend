module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  darkMode: "media", // or 'class'
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      hsm: { raw: "(min-height: 600px)" },
      // => @media (min-height: 600px) { ... }

      maxhsm: { raw: "(max-height: 600px)" },
      // => @media (max-height: 600px) { ... }

      maxhmd: { raw: "(max-height: 800px)" },
      // => @media (max-height: 800px) { ... }

      hmd: { raw: "(min-height: 765px)" },
      // => @media (min-height: 765px) { ... }

      hlg: { raw: "(min-height: 800px)" },
      // => @media (min-height: 800px) { ... }

      hxl: { raw: "(min-height: 900px)" },
      // => @media (min-height: 900px) { ... }

      h2xl: { raw: "(min-height: 1050px)" },
      // => @media (min-height: 1050px) { ... }

      h3xl: { raw: "(min-height: 1200px)" },
      // => @media (min-height: 1200px) { ... }
    },
    variants: {
      opacity: ({ after }) => after(["disabled"]),
    },
    plugins: [],
  },
};
