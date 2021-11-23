
describe('Dashboard', () => {
  beforeEach(()=> {
    cy
      .visit('/')
      .get('button').contains(/log in with spotify/i)
      .click()
  })

  it('should login', () => {
    // cy
    //   .findByText("log in with spotify")
    //   .click()
    //   .get('#login-username')
    //   .type(USERNAME)
    //   .get('#login-password')
    //   .type(PASSWORD)
    //   .get('#login-button')
    //   .click();
  })

  it('should click on Update Library & show all the user artists', () => {

    cy
      .get('button').contains(/Update library/i)
      .click()
      .get('.item-name').contains(/avicii/i)
  })

  it('should display all albums of an artists', () => {
    cy
      .get('button').contains(/Update library/i)
      .click()
      .get('.item-name').contains(/avicii/i)
      .click()
      .get('.album-container').contains("Stories")
  })

  it('should add a tag to an artist', () => {
    cy
      .get('button').contains(/Update library/i)
      .click()
      .get('.item-name').contains(/avicii/i)
      .click()
      .get('button').contains(/tag artist/i)
      .click()
      .get('.expanded')
      .type('techno{enter}')
      .get('.tag-container').contains(/techno/i)
  })
})