const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // https://on.cypress.io/experiments
  // https://github.com/cypress-io/cypress/issues/1030
  experimentalCspAllowList: ['default-src', 'script-src'],
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3003',
    viewportHeight: 400,
    viewportWidth: 500,
    supportFile: false,
    fixturesFolder: false,
    defaultCommandTimeout: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
