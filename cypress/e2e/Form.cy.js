describe('Test suit 1 for the form', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit("https://brella-react-git-temp-qa-form-brella.vercel.app/")
  });

  /*------ Verify all elements are visible -------*/

  it('Test case 1- Should display all form elements correctly', () => {
    cy.get('[data-test="form-name-input"]').should('be.visible')
    cy.get('[data-test="form-switch-input"]').should('be.visible')
    cy.get('[data-test="form-email-input"]').should('be.visible')
    cy.get('[data-test="form-number-input"]').should('be.visible')
    cy.get('[data-test="form-year-input"]').should('be.visible')
    cy.get('[data-test="submit"]').should('be.visible');
  });

  /*------ Verify the Name field -------*/

  it('Test case 2- Should accept valid and special character names in the Name field', () => {
    cy.fixture('FormData').then((data) => {
      // Input the name into the Name field - Positive
      cy.get('[data-test="form-name-input"]').type(data['name-valid'])
      cy.get('[data-test="form-name-input"]').should('have.value', data['name-valid'])

      // Input special characters into the Name field - Positive
      cy.get('[data-test="form-name-input"]').clear().type(data['name-characters'])
      cy.get('[data-test="form-name-input"]').should('have.value', data['name-characters'])
    });
  });

  /*------ Toggle the switch button -------*/

  it('Test case 3- Should toggle the switch button on and off', () => {
    cy.get('[data-test="form-switch-input"]')
      .click().should('have.attr', 'aria-checked', 'true')
      .click().should('have.attr', 'aria-checked', 'false')
  });

  /*------ Verify the email field -------*/

  it('Test case 4- Should disable the submit button when the email field is empty', () => {
    cy.get('[data-test="form-email-input"]').clear()
    cy.get('[data-test="submit"]').should('be.disabled')
  });

  it('Test case 5- Should show an alert when the email field is cleared after being filled', () => {
    cy.fixture('FormData').then((data) => {
      // Enter a valid email address
      cy.get('[data-test="form-email-input"]').type(data['email-type-2-valid'])

      // Clear the email field
      cy.get('[data-test="form-email-input"]').clear()

      // Assert that the alert message is displayed
      cy.get('[data-test="form-email"]')
        .should('have.class', 'ant-form-item-has-error')
        .find('[role="alert"]')
        .should('contain.text', 'Please fill the email!')
      cy.get('[data-test="submit"]').should('be.disabled')
    });
  });

  it('Test case 6- Should enable the submit button for valid email and display an error for invalid email', () => {
    cy.fixture('FormData').then((data) => {
      // Test case 1 - Enter a valid email address
      cy.get('[data-test="form-email-input"]').type(data['email-type-1-valid'])
      cy.get('[data-test="submit"]').should('not.be.disabled')

      // Test case 2 - Enter an invalid email address
      cy.get('[data-test="form-email-input"]').clear()
      cy.get('[data-test="form-email-input"]').type(data['email-invalid'])
      cy.get('[data-test="submit"]').click()
      cy.get('.ant-message').should('be.visible')
    });
  });

  /*------ Verify the Input Number field -------*/

  it('Test case 7- Should only accept numbers between 1 and 100 in the number field', () => {
    cy.fixture('FormData').then((data) => {
      // Enter a valid number
      cy.get('[data-test="form-number-input"]').clear().type(data['number-valid-1'])
      cy.get('[data-test="form-number-input"]').should('have.value', data['number-valid-1'])

      // Enter a number greater than 100
      cy.get('[data-test="form-number-input"]').clear().type(data['number-invalid'])
      cy.get('.ant-form-item-extra').should('contain', 'between 1 and 100')
    });
  });

  /*------ Submitting the form with valid details 1 - Positive scenario -------*/

  it('Test case 8- Should submit the form successfully when all fields are valid and switch is true', () => {
    cy.fillName('name-valid')
    cy.toggleSwitch(true)
    cy.fillEmail('email-type-2-valid')
    cy.fillNumber('number-valid-1')

    // Submit the form
    cy.get('[data-test="submit"]').click()

    cy.fixture('FormData').then((data) => {
      cy.get('[data-test="submission-container"]')
        .should('contain', data['name-valid'])
        .and('contain', 'switch: true')
        .and('contain', data['email-type-2-valid'])
        .and('contain', data['number-valid-1'])
    });
  });

  it('Test case 9- Should submit the form successfully when all fields are valid and switch is false', () => {
    cy.fillName('name-valid')
    cy.toggleSwitch(false)
    cy.fillEmail('email-type-1-valid')
    cy.fillNumber('number-valid-2')

    // Submit the form
    cy.get('[data-test="submit"]').click();

    cy.fixture('FormData').then((data) => {
      cy.get('[data-test="submission-container"]')
        .should('contain', data['name-valid'])
        .and('contain', 'switch: false')
        .and('contain', data['email-type-1-valid'])
        .and('contain', data['number-valid-2'])
    });
  });

  it('Test case 10- Should fail to submit the form with an invalid email', () => {
    cy.fillName('name-valid')
    cy.toggleSwitch(true)
    cy.fillNumber('number-valid-2')

    cy.get('[data-test="submit"]').should('be.disabled')
  });
});









