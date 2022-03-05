/// <reference types="cypress" />

describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the correct title", () => {
    cy.title().should("include", "Ajaib App");
    cy.contains(/example with search and filter/i).should("be.visible");
  });

  it("should display input elements", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    // keyword search element
    cy.get("#search").should("be.visible");
    cy.get("label[for='search']").should("be.visible");

    // select element
    cy.get('[data-test="gender-select"]').should("be.visible");
    cy.get("label[for='gender']").should("be.visible");
    cy.get("#gender").click({ force: true });
    cy.get('[title="All"]').contains("All");
    cy.get('[title="Female"]').contains("Female");
    cy.get('[title="Male"]').contains("Male");

    // button reset filter
    cy.contains(/reset filter/i);
  });

  it("should display table on first render", () => {
    // table
    cy.get('[data-test="user-table"]').should("be.visible");
    cy.get("tr").should("have.length", 9); // including header
  });
});
