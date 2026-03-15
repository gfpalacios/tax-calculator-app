import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173",
    supportFile: false,
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
  },
});
