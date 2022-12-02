describe("Navigation", () => {
  it("Should navigate to the registration page", () => {
    // Start from the login page
    cy.visit("http://localhost:3000/login");
    // Find a link with an href attribute containing "register" and click it
    cy.get('a[href*="register"]').click();

    // The new url should include "/register"
    cy.url().should("include", "/register");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Sign up");
  });
});
