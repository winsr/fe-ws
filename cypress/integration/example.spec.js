// example.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Simple test", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("it focuses the input", () => {
    cy.focused().should("have.class", "form-username")
  })

  it("imput username & room", () => {
    const input = "bambang"
    const room = "gundam"

    cy.get(".form-username").type(input).should("have.value", input)
    cy.get(".form-room").type(room).should("have.value", room)
    cy.get(".form-button").click()
  })

  it("send a message in apps", () => {
    const input = "bambang"
    const room = "gundam"
    const text = "selamat pagi"

    cy.get(".form-username").type(input).should("have.value", input)
    cy.get(".form-room").type(room).should("have.value", room)
    cy.get(".form-button").click()
    cy.get(".chat-message")
      .find(".message-text")
      .should("have.text", `Welcome ${input}`)

    cy.get(".form-input-text").type(text).should("have.value", text)
    cy.get(".form-submit-text").click()

    cy.get("div.chat-message").children(".message").should("have.length", 2)
  })
})
