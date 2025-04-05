/// <reference types="cypress" />
describe("OrderCard Test", function () {
    context("No Orders", () => {
        describe("Show Message that no orders in available", () => {
            beforeEach(() => {
                cy.loginMockUser("admin")
                cy.visit("http://localhost:3000/Dashboard?test=true&variant=empty");
            });

            it("Show message when no orders is available", () => {
                cy.getByData("dashbar-button").click();
                cy.contains("Inga ordrar i denna kategori");
            });

            it("Shall not show any ordercard", () => {
                cy.get("[data-cy=order-card]").should("not.exist");
            });
        });
    });

    context("With Test Order", () => {
        beforeEach(() => {
            cy.loginMockUser("admin");
            cy.visit("http://localhost:3000/Dashboard?test=true&variant=single");
        });
        describe("Present general info about the order", () => {
            it("Show when a order is awailable", () => {
                cy.getByData("dashbar-button").click();
                cy.contains("Testperson Testsson");
                cy.contains("Order No # 0");
                cy.contains("12:00");
                cy.contains("Mottagen");
            });
        });

        describe("Open upp the ordercard", () => {
            it("Opens up using expand button", () => {
                cy.getByData("expand-button").click();
                cy.getByData("pizza-name").contains("Margarita");
                cy.getByData("pizza-quantity").contains("1 st");
                cy.getByData("pizza-price").contains("125");
                cy.getByData("status-button-low")
                    .contains("Tillagning")
                    .click();
                cy.getByData("status-button-top").contains("Tillagning");
            });
        });
    });
});
