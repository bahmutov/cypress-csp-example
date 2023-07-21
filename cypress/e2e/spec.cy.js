/// <reference types="cypress" />

it('adds new messages one by one', () => {
  cy.visit('/')
  cy.contains('button', 'Send').should('be.disabled')
  cy.get('#message').type('Hello')
  cy.contains('button', 'Send').click()
  cy.get('#messages li').should('have.length', 1).and('have.text', 'Hello')
  cy.get('#message').should('have.value', '')
  cy.contains('button', 'Send').should('be.disabled')
})
