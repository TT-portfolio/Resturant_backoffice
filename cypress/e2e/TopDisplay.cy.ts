/// <reference types="cypress" />

describe('Top Display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000?test=true&variant=single')
  })
  
  it("Should present PizzaLover", () =>{
    cy.getByData("TopDisplayName").contains("PizzaLover")
  })
  it("Should present Signin when not logged in", () =>{
    cy.getByData("Signin").contains("Sign In")
  })
})

describe('Top display', () => {
  beforeEach(function () {
    cy.loginMockUser("admin");
    cy.visit('http://localhost:3000?test=true&variant=single')
})

it('should show SignOut when logged in', ()=> {
  cy.getByData("Signout").contains("Sign Out")
})
})