// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxtjs/color-mode",
    ],

    css: ["~/assets/css/main.css"],

    colorMode: { preference: "system", fallback: "dark", classSuffix: "" },

    fonts: {
        defaults: {
            weights: [300, 400, 600, 700],
            styles: ["normal", "italic"],
            subsets: ["latin"],
        },
    },
});
