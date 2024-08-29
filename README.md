## Technical Assignment

### Installing Cypress

--> Install Cypress via npm:

cd /your/project/path

npm install cypress --save-dev

--> To run the Cypress tests, use the following command:

npx cypress open

Can Access the installation guide through:
https://docs.cypress.io/guides/getting-started/installing-cypress
## Cypress Configuration Updates

### Memory Management Improvements
To optimize the performance of Cypress tests, especially in memory-intensive applications, made the following changes to the Cypress configuration:

- **Experimental Memory Management**: Enabled to help manage memory usage more effectively during test runs.
- **Reduced Number of Tests Kept in Memory**: The `numTestsKeptInMemory` setting has been reduced to 5 to minimize memory consumption.

These changes are included in the `cypress.config.js`  file:

```javascript
/*cypress.config.js
module.exports = {
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 5,
};*/

