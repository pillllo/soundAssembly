
describe('Dashboard', () => {
  beforeEach(()=> {
  })

  it('should click on Update Library', () => {
    cy.visit('/');
    cy
      .findByText("log in with spotify")
      .click()
      // .get('input')
      .get('#login-username')
      // .invoke('attr', 'placeholder').should('contain', 'username')
      // .findByRole("input")
      // .findByPlaceholderText("Email address or username")
      .type("james.foxlee@protonmail.com")
      .get('#login-password')
      // .findByLabelText(/password/)
      .type("v+8THN89hxgyR9G&trbK")
      .get('#login-button')
      .click();
  })
})