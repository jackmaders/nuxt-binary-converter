// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
  ],
  devtools: { enabled: true },
  tailwindcss: {
    // prevent message on startup
    viewer: false,
  },
  eslint: {
    // prevent warning on startup
    lintOnStart: false,
  },
  experimental: {
    appManifest: false,
  },
});
