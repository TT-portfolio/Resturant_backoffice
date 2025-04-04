describe('Google', function () {
    beforeEach(function () {
      cy.loginMockUser("admin")
    })
  
    it('shows onboarding', function () {
      cy.contains('Sign Out').should('be.visible')
    })
  })
  