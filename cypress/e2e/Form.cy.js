describe('Test suit 1 for the form', () => {
  beforeEach(() => 
    {
      // Visit the main page before each test
      cy.visit("https://brella-react-git-temp-qa-form-brella.vercel.app/");//Website URL 
    });
  
    
  /*------ Verify all elements are visible------- */

   it('Load the form', () => 
    {
        cy.get('[data-test="form-name-input"]').should('be.visible');
        cy.get('[data-test="form-switch-input"]').should('be.visible');
        cy.get('[data-test="form-email-input"]').should('be.visible');
        cy.get('[data-test="form-number-input"]').should('be.visible');
        cy.get('[data-test="form-year-input"]').should('be.visible');
        cy.get('[data-test="submit"]').should('be.visible');


    })

  /*------ Verify the Name field------- */

  it('Verifying the Name field ', () => 
   {

        // Input the name into the Name field-Positive
        cy.get('[data-test="form-name-input"]').type('Theekshani Nathali Wickramasinghe');
        cy.get('[data-test="form-name-input"]').should('have.value', 'Theekshani Nathali Wickramasinghe');

        // Input special characters into the Name field -Positive
        cy.get('[data-test="form-name-input"]').clear().type('Theekshani@12$%^&*');
        cy.get('[data-test="form-name-input"]').should('have.value', 'Theekshani@12$%^&*');
  
  
  })   

  /*------ Toggle the switch button------- */


  it('Toggle the Switch Button ', () => 
  {
  
        // Toggle the switch button on and off, checking its state
        cy.get('[data-test="form-switch-input"]')
        .click().should('have.attr', 'aria-checked', 'true')
        .click().should('have.attr', 'aria-checked', 'false');
      
  
  }) 

    /*------ Verify the email feild------- */


  it('Verifies the email ', () => 
  {
  
      // Leave the Email field empty and try to submit- Negative scenario
      cy.get('[data-test="form-email-input"]').clear();

      // Check that the submit button is disabled
      cy.get('[data-test="submit"]').should('be.disabled');

      /*
      // Enter spaces to the email feild and try to hit submit button
        cy.get('[data-test="form-email-input"]').type('    ');
      // Check that the submit button is still disabled
      cy.get('[data-test="submit"]').should('be.disabled');
      */

  }) 

  //Upon clearing the email feild and check the validation 
  it('should show an alert when the email field is cleared after being filled', () =>
     {

        // Enter a valid email address
        cy.get('[data-test="form-email-input"]').type('theekshani@yahoo.com');
      
        // Clear the email field
        cy.get('[data-test="form-email-input"]').clear();
        
        // Assert that the alert message is displayed
        cy.get('[data-test="form-email"]')
          .should('have.class', 'ant-form-item-has-error')
          .find('[role="alert"]')
          .should('contain.text', 'Please fill the email!');
        cy.get('[data-test="submit"]').should('be.disabled');

    });

it('Test case 1 - valid email, Test case 2 invalid email', () => {

        // Test case 1 -Enter a valid email address
        cy.get('[data-test="form-email-input"]').type('theekshani@gmail.com');
      
        // Check that the submit button is enabled
        cy.get('[data-test="submit"]').should('not.be.disabled');

        // Test case 2 - Enter an invalid email address
        cy.get('[data-test="form-email-input"]').clear();

        cy.get('[data-test="form-email-input"]').type('theekshanigmail.com');

        // Attempt to submit the form
        cy.get('[data-test="submit"]').click();

        // Erros msg shall be displyed 
        cy.get('.ant-message')
          .should('be.visible')
    });

    /*------ Verify the Input Number feild------- */

  it('Should only accept numbers between 1 and 100 in the number field', () => {

      // Enter a valid number
      cy.get('[data-test="form-number-input"]').clear().type('50');
      cy.get('[data-test="form-number-input"]').should('have.value', '50');
  
      // Enter a number greater than 100
      cy.get('[data-test="form-number-input"]').clear().type('150');
      cy.get('.ant-form-item-extra').should('contain', 'between 1 and 100');
    });
  

    /* SHOWING AN ERROR ------ Verify the Date picker feild-------    */

    /*
    it.only('should select a year from the date picker', () => {
        //  Open the date picker by clicking on the input field or calendar icon
        //Step 1: Open the date picker
      cy.get('[data-test="form-year-input"]')
        .should('be.visible')
        .click({ force: true });
    
      //  Select the year (if the year picker is a separate control)
      cy.get('.ant-picker-year-select').click({ force: true });
    
      // Ensure the year picker is visible before selecting
      cy.get('.ant-picker-cell-inner').contains('2023').click({ force: true });
    
      // Step 4: Verify the input field contains the selected year
      cy.get('[data-test="form-year-input"]').should('have.value', '2023');
      
      

    });
    */
    
   /*  ------ Submitting the form with valid details 1 - Positive scenario -------    */

  
  it('Should submit the form successfully when all fields are valid switch is true', () => {
          // Fill all fields correctly
          cy.get('[data-test="form-name-input"]').type('Theekshani Nathali Wickramasinghe');
          cy.get('[data-test="form-switch-input"]').click();
          cy.get('[data-test="form-email-input"]').type('theekshani.m@gmail.com');
          cy.get('[data-test="form-number-input"]').clear().type('70');
          //Showing an error while click() on the date picker
          // cy.get('[data-test="form-year-input"]').click();
          // cy.get('.ant-picker-year-panel-cell').contains('2024').click();
      
          // Submit the form
          cy.get('[data-test="submit"]').click();
      
        // Verify submission container shows the details
          cy.get('[data-test="submission-container"]').should('contain', 'Theekshani Nathali Wickramasinghe')
          .and('contain', 'switch: true')
          .and('contain', 'theekshani.m@gmail.com')
          .and('contain', '70')
          //Showing an error while click() on the date picker
          // .and('contain', '2024');
    });

  it('Should submit the form successfully when all fields are valid, switch is false', () => {
      // Fill all fields correctly
      cy.get('[data-test="form-name-input"]').type('Theekshani Nathali Wickramasinghe');
      cy.get('[data-test="form-switch-input"]');
      cy.get('[data-test="form-email-input"]').type('theekshani.m@gmail.com');
      cy.get('[data-test="form-number-input"]').clear().type('70');
      //Showing an error while click() on the date picker
      // cy.get('[data-test="form-year-input"]').click();
      // cy.get('.ant-picker-year-panel-cell').contains('2024').click();
  
      // Submit the form
      cy.get('[data-test="submit"]').click();
  
    // Verify submission container shows the details
      cy.get('[data-test="submission-container"]').should('contain', 'Theekshani Nathali Wickramasinghe')
      .and('contain', 'switch: false')
      .and('contain', 'theekshani.m@gmail.com')
      .and('contain', '70')
      //Showing an error while click() on the date picker
      // .and('contain', '2024');
});

/*  ------ Submitting the form with invalid details - Negative scenario -------    */

  it('should fail to submit the form with an invalid email', () => {

          // Fill in other fields and leave email empty
          cy.get('[data-test="form-name-input"]').type('Theekshani ');
          cy.get('[data-test="form-switch-input"]').click();
          cy.get('[data-test="form-number-input"]').clear().type('50');
          // cy.get('[data-test="form-year-input"]').click();
          // cy.get('.ant-picker-year-panel-cell').contains('2024').click();
    
          // Save button shall be disabled 
          cy.get('[data-test="submit"]').should('be.disabled');
          

  })

})