describe('Top Display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000?test=true&variant=single')
  })

  it("Should present correct navigation", () => {
    cy.getByData("TopNavigation").contains("Dashboard")
    cy.getByData('dashbar-button').click()
    cy.get("li").eq(1).click()
    cy.getByData("TopNavigation").contains(/^Dashboard > Tillagning$/)
  })

  it.only("Should present correct navigation", () => {
    cy.getByData("TopNavigation").contains("Dashboard")
    cy.getByData('dashbar-button').click()
    cy.get("li").eq(0).click()
    cy.getByData("TopNavigation").contains(/^Dashboard > Mottagen$/)
  })
})