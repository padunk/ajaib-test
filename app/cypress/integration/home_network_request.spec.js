/// <reference types="cypress" />

describe("network request", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be showing data from mock data", () => {
    // intercept all network requests
    cy.intercept(
      "GET",
      "https://randomuser.me/api/?gender=all&page=1&pageSize=8&results=24",
      {
        fixture: "users.json",
      }
    );

    cy.contains(/brad gibson/i).should("be.visible");
    cy.contains(/shawna gibson/i).should("be.visible");
  });

  it("should be showing data from keyword parameters", () => {
    // intercept all network requests
    cy.intercept(
      "GET",
      "https://randomuser.me/api/?gender=all&keyword=susan&page=1&pageSize=8&results=24",
      {
        fixture: "users.json",
      }
    );

    cy.get('[placeholder="Search..."]').type("susan{enter}");

    cy.contains(/brad gibson/i).should("be.visible");
    cy.contains(/shawna gibson/i).should("be.visible");
  });

  it("should be showing data from gender parameters", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    // intercept all network requests
    cy.intercept(
      "GET",
      "https://randomuser.me/api/?gender=female&page=1&pageSize=8&results=24",
      {
        fixture: "user-female.json",
      }
    );

    cy.get("#gender").click({ force: true });
    cy.get('[title="Female"]').contains("Female").click();

    cy.contains(/shawna gibson/i).should("be.visible");
  });

  it("reset filter", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    // intercept all network requests
    cy.intercept(
      "GET",
      "https://randomuser.me/api/?gender=all&page=1&pageSize=8&results=24",
      {
        fixture: "users.json",
      }
    );

    cy.get('[placeholder="Search..."]').type("susan{enter}");
    cy.get("#gender").click({ force: true });
    cy.get('[title="Female"]').contains("Female").click();
    cy.contains(/reset filter/i).click();

    cy.contains(/brad gibson/i).should("be.visible");
    cy.contains(/shawna gibson/i).should("be.visible");
  });
});
