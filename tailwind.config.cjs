/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Warm near-black canvas (Editorial Noir)
        base: "#0a0a0b",
        night: "#0a0a0b", // alias for text-on-acid (avoids the core `text-base` font-size clash)
        "base-2": "#0f0f10",
        surface: "#141414",
        "surface-2": "#1a1a1b",
        line: "rgba(244,241,234,0.10)",
        "line-strong": "rgba(244,241,234,0.18)",
        // Editorial cream ink
        ink: "#f4f1ea",
        muted: "#b3ada1",
        faint: "#8a8478",
        // Developer-terminal acid accent
        acid: {
          DEFAULT: "#c6ff3d",
          soft: "#dcff8a",
          dim: "#9bd400",
        },
        // Warm editorial highlight
        ember: {
          DEFAULT: "#ff6a3d",
          soft: "#ff9166",
        },
        // legacy tokens kept so any stray class won't break the build
        primary: { light: "#f4f1ea", dark: "#0a0a0b" },
        secondary: "#b3ada1",
        tertiary: "#141414",
        "black-100": "#0f0f10",
        "black-200": "#0a0a0b",
        "white-100": "#f4f1ea",
        text: { light: "#0a0a0b", dark: "#f4f1ea" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 40px 120px -30px rgba(0,0,0,0.85)",
        acid: "0 0 0 1px rgba(198,255,61,0.4), 0 18px 60px -20px rgba(198,255,61,0.35)",
        brut: "6px 6px 0 0 #c6ff3d",
        soft: "0 24px 70px -24px rgba(0,0,0,0.7)",
        // new: accent glows for pills / CTAs
        glow: "0 0 24px -4px rgba(198,255,61,0.45), 0 0 60px -20px rgba(198,255,61,0.35)",
        "glow-sm": "0 0 12px -2px rgba(198,255,61,0.55)",
        "glow-ember": "0 0 30px -6px rgba(255,106,61,0.45)",
        lift: "0 30px 80px -40px rgba(0,0,0,0.9)",
      },
      screens: { xs: "450px" },
      // Tailwind's stock opacity scale skips most values (no 8, 12, 15, 35,
      // 45, 88...), and a miss is silent: `bg-base/88` simply emits nothing and
      // the scrim disappears. Full 0-100 in steps of 1; JIT only ships what's
      // actually used, so this costs nothing in the bundle.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])
      ),
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(244,241,234,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,241,234,0.045) 1px, transparent 1px)",
      },
      backgroundSize: { grid: "64px 64px" },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-rev": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        "float-sm": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        blob: {
          "0%,100%": { borderRadius: "42% 58% 63% 37% / 42% 45% 55% 58%", transform: "rotate(0deg)" },
          "50%": { borderRadius: "58% 42% 38% 62% / 55% 58% 42% 45%", transform: "rotate(180deg)" },
        },
        "orb-spin": { to: { transform: "rotate(360deg)" } },
        "pulse-dot": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "70%,100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(110%)" },
          "100%": { transform: "translateY(0)" },
        },
        // new
        sheen: { "100%": { transform: "translateX(200%) skewX(-12deg)" } },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        "sweep-y": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        marquee: "marquee 38s linear infinite",
        "marquee-rev": "marquee-rev 38s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 7s ease-in-out infinite",
        "float-sm": "float-sm 5s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        "orb-spin": "orb-spin 24s linear infinite",
        "pulse-dot": "pulse-dot 2.4s cubic-bezier(0.2,0.6,0.35,1) infinite",
        sheen: "sheen 1.1s ease-out",
        "scroll-dot": "scroll-dot 1.9s ease-in-out infinite",
        "sweep-y": "sweep-y 5s linear infinite",
      },
    },
  },
  plugins: [],
};
