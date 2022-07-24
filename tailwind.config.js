module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#fda4af",
          "secondary": "#d946ef",
          "accent": "#4338ca",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#4f46e5",
          "success": "#15803d",
          "warning": "#FBBD23",
          "error": "#be123c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],

}