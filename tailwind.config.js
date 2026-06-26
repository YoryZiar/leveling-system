/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#b7b5b4",
        "secondary-container": "#474746",
        "secondary": "#c8c6c5",
        "secondary-fixed": "#e5e2e1",
        "on-error": "#690005",
        "inverse-surface": "#d4e4fa",
        "primary-container": "#00d2ff",
        "surface-container": "#122131",
        "on-tertiary-fixed-variant": "#474646",
        "surface-dim": "#051424",
        "surface-container-high": "#1c2b3c",
        "error": "#ffb4ab",
        "surface": "#051424",
        "error-container": "#93000a",
        "on-surface-variant": "#bbc9cf",
        "surface-variant": "#273647",
        "tertiary-container": "#c3c0c0",
        "surface-container-lowest": "#010f1f",
        "on-secondary": "#313030",
        "on-primary": "#003543",
        "inverse-primary": "#00677f",
        "surface-container-low": "#0d1c2d",
        "inverse-on-surface": "#233143",
        "primary-fixed": "#b6ebff",
        "secondary-fixed-dim": "#c8c6c5",
        "background": "#051424",
        "surface-container-highest": "#273647",
        "on-primary-fixed-variant": "#004e60",
        "outline-variant": "#3c494e",
        "on-tertiary-fixed": "#1c1b1b",
        "primary": "#a5e7ff",
        "on-secondary-fixed-variant": "#474746",
        "on-error-container": "#ffdad6",
        "on-primary-container": "#00566a",
        "on-tertiary-container": "#4f4e4e",
        "on-surface": "#d4e4fa",
        "tertiary-fixed": "#e5e2e1",
        "surface-tint": "#47d6ff",
        "outline": "#859399",
        "on-tertiary": "#313030",
        "on-secondary-fixed": "#1c1b1b",
        "on-background": "#d4e4fa",
        "surface-bright": "#2c3a4c",
        "on-primary-fixed": "#001f28",
        "primary-fixed-dim": "#47d6ff",
        "tertiary": "#dfdcdb",
        "tertiary-fixed-dim": "#c9c6c5"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin": "20px",
        "gutter": "16px",
        "stack-lg": "32px",
        "stack-md": "16px",
        "unit": "4px",
        "stack-sm": "8px"
      },
      fontFamily: {
        "headline-lg-mobile": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "display-lg": ["Geist", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-mono": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "500" }]
      }
    }
  },
  plugins: [],
}
