const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Reduce the number of test results kept in memory
    numTestsKeptInMemory: 5,

    // Enable experimental memory management feature
    experimentalMemoryManagement: true,

    // Disable video recording to save resources (optional)
    video: false,

    // Set the default command timeout if your tests might be timing out
    defaultCommandTimeout: 10000, // 10 seconds

    // Set other browser-specific settings if needed
    chromeWebSecurity: false, // May help with some memory issues but use with caution
  },
});
