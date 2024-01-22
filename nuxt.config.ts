// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
  ],
  devtools: { enabled: true },
  eslint: {
    // prevent warning on startup
    lintOnStart: false,
  },
  tailwindcss: {
    // prevent message on startup
    viewer: false,
  },
});
