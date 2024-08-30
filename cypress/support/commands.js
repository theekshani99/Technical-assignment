// cypress/support/commands.js

Cypress.Commands.add('fillName', (nameKey) => {
    cy.fixture('FormData').then((data) => {
      cy.get('[data-test="form-name-input"]').type(data[nameKey]);
    });
  });
  
  Cypress.Commands.add('fillEmail', (emailKey) => {
    cy.fixture('FormData').then((data) => {
      cy.get('[data-test="form-email-input"]').type(data[emailKey]);
    });
  });
  
  Cypress.Commands.add('fillNumber', (numberKey) => {
    cy.fixture('FormData').then((data) => {
      cy.get('[data-test="form-number-input"]').clear().type(data[numberKey]);
    });
  });
  
  Cypress.Commands.add('toggleSwitch', (shouldToggle = true) => {
    if (shouldToggle) {
      cy.get('[data-test="form-switch-input"]').click();
    }
  });
  