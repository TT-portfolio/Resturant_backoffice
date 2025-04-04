import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      googleRefreshToken: process.env.GOOGLE_REFRESHTOKEN,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});