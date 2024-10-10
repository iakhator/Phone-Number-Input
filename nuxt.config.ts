// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/vitest.js'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["vitest/globals"] // TypeScript support for globals
      }
    }
  }
})
