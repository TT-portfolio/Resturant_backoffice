/// <reference types="cypress" />

describe("Top Display not logged in", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000?test=true&variant=single");
    });

    it("Should present PizzaLover", () => {
        cy.getByData("TopDisplayName").contains("PizzaLover");
    });
    it("Should present Signin when not logged in", () => {
        cy.getByData("Signin").contains("Sign In");
    });
    it("Shoud not show any user or role",() => {
      cy.getByData('UserName').should("not.exist")
      cy.getByData('UserRole').should("not.exist")
    })
});

describe("Top display logged in with admin", () => {
    beforeEach(function () {
        cy.loginMockUser("admin");
        cy.visit("http://localhost:3000?test=true&variant=single");
    });

    it("should show SignOut when logged in", () => {
        cy.getByData("Signout").contains("Sign Out");
    });

    it("Should show usernamn and role when logged in", () => {
      cy.getByData("UserName").contains("PizzaLover")
      cy.getByData("UserRole").contains("admin")
    })
});
describe("Top display logged in with google", () => {
    beforeEach(function () {
        cy.loginMockUser();
        cy.visit("http://localhost:3000?test=true&variant=single");
    });

    it("should show SignOut when logged in", () => {
        cy.getByData("Signout").contains("Sign Out");
    });

    it("Should show usernamn and role when logged in", () => {
      cy.getByData("UserName").contains("PizzaLover")
      cy.getByData("UserRole").contains("user")
    })
});
