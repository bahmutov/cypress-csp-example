/// <reference types="cypress" />

it('adds a new message', () => {
  cy.visit('/')
  cy.contains('button', 'Send').should('be.disabled')
  cy.get('#message').type('Hello')
  cy.contains('button', 'Send').click()
  cy.get('#messages li').should('have.length', 1).and('have.text', 'Hello')
  cy.get('#message').should('have.value', '')
  cy.contains('button', 'Send').should('be.disabled')
})

it('adds a bold message', () => {
  cy.visit('/')
  cy.get('#message').type('<b>Important</b>')
  cy.contains('button', 'Send').click()
  cy.get('#messages li b')
    .should('have.length', 1)
    .and('have.text', 'Important')
})
