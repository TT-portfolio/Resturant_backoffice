declare namespace Cypress {
    interface Chainable {
        loginMockUser(role?: string): Chainable<void>
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
}