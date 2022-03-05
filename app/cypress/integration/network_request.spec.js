/// <reference types="cypress" />

describe("Network Requests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("cy.request() - make an XHR request", () => {
    // https://on.cypress.io/request
    cy.request(
      "https://randomuser.me/api/?gender=all&page=1&pageSize=8&results=24"
    ).should((response) => {
      expect(response.status).to.eq(200);
      // the server sometimes gets an extra comment posted from another machine
      // which gets returned as 1 extra object
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });
});
