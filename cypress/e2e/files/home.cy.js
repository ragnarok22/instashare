describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.fixture("file_list.json").as("files");
    cy.intercept("GET", "**/api/files/", { fixture: "file_list" }).as(
      "getFiles"
    );
  });
  it("Should redirect to login", () => {
    // Find a link with an href attribute containing "about" and click it
    cy.location("pathname").should("include", "login");

    // The new url should include "/about"
    // cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    // cy.get("div").contains("Unload and download files.");
  });

  it("Should load a files", () => {
    localStorage.setItem(
      "state",
      JSON.stringify({
        token: "mytoken",
        username: "john",
        first_name: "John",
        last_name: "Doe",
      })
    );
    cy.get("div").contains("Welcome John");

    cy.wait("@getFiles").then((interception) => {
      console.log(interception);
    });

    cy.wait("@getFiles").its("response.statusCode").should("eq", 200);
  });
});
