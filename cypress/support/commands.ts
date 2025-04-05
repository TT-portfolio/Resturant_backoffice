declare namespace Cypress {
    interface Chainable {
        loginMockUser(role?: string): Chainable<void>
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
}

Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add("loginMockUser", (role = "user") => {
    cy.request("POST", "http://localhost:3000/api/test-login", {role});
    cy.visit("/");
});

