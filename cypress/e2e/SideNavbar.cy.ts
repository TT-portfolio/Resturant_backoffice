describe('SideNavbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000?test=true&variant=single')
  })

  it('Should present Dashboard', () => {
    cy.getByData("dashbar-button").contains("Dashboard")
  })
  
  it('Should open when clicked', ()=> {
    cy.getByData("dashbar-button").click()
    cy.get("li").first().contains("Mottagen")
    cy.get("li").eq(1).contains("Tillagning")
    cy.get("li").eq(2).contains("Leverans")
    cy.get("li").eq(3).contains("Avslutad")
  })

  it('Should present correct filter', () => {
    cy.getByData('dashbar-button').click()
    cy.get("li").eq(0).click()
    cy.getByData('status-button-top').contains('Mottagen')
  })
  
  it('Should present no orders in category when empty', () => {
    cy.getByData('dashbar-button').click()
    cy.get("li").eq(1).click()
    cy.getByData('NoOrders').contains('Inga ordrar i denna kategori')
  })
  

})