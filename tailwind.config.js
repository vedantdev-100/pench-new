// tailwind.config.js
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ── Brand Colors (from Figma)
        brand: {
          primary: "#1B5E37",     // dark green — Log In button, accents
          secondary: "#2E7D52",   // medium green
          light: "#eaf6ef",       // light green bg tint
        },

        // ── Background
        bg: {
          screen: "#F0EBE1",      // warm cream — full screen background
          card: "#FFFFFF",        // white card
          input: "#f9f9f9",       // input field background
          auth: "#f3f3f3",
        },

        // ── Text
        text: {
          primary: "#1A1A1A",     // near black — headings
          secondary: "#4A4A4A",   // dark grey — subtext
          muted: "#9E9E9E",       // placeholder text
          link: "#D4872A",        // amber/orange — "Forgot Password", "Need help?"
          white: "#FFFFFF",
        },

        // ── Input / Border
        border: {
          disable: "#ececec",     // input border
          focus: "#1B5E37",                 // focused border
        },

        // ── Status
        success: "#1B5E37",
        warning: "#D4872A",
        error: "#E53E3E",

        // ── Footer
        footer: {
          bg: "#FFFFFF",
          text: "#6B7280",
          badge: "#1B5E37",
        },
      },

      fontFamily: {
        sans: ["System"],
        heading: ["System"],     // swap with custom font if added (e.g. Poppins)
      },

      fontSize: {
        // ── From Figma
        "display": [28, { lineHeight: "36px", fontWeight: "700" }],   // "Welcome back, Partner"
        "title": [22, { lineHeight: "30px", fontWeight: "700" }],
        "body-lg": [16, { lineHeight: "24px", fontWeight: "400" }],
        "body": [14, { lineHeight: "22px", fontWeight: "400" }],
        "body-sm": [13, { lineHeight: "20px", fontWeight: "400" }],
        "caption": [12, { lineHeight: "18px", fontWeight: "400" }],
        "label": [14, { lineHeight: "20px", fontWeight: "600" }],
      },

      borderRadius: {
        "card": "20px",       // card container
        "input": "12px",      // input fields
        "btn": "12px",      // buttons
        "badge": "999px",     // pill badges
      },

      spacing: {
        "screen-x": "24px",   // horizontal screen padding
        "card-x": "24px",   // card inner horizontal padding
        "card-y": "32px",   // card inner vertical padding
      },

      boxShadow: {
        "card": "0 4px 24px rgba(0, 0, 0, 0.08)",
        "input": "0 1px 4px rgba(0, 0, 0, 0.04)",
      },

      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};