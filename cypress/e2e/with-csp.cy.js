/// <reference types="cypress" />

it('serves Content-Security-Policy header', () => {
  cy.request('/')
    .its('headers')
    .should('have.property', 'content-security-policy')
    // confirm parts of the CSP directive
    .should('include', "default-src 'self'")
    .and('include', 'report-uri /security-attacks')
})

it('can strip CSP and allow injections', () => {
  cy.intercept('GET', '/', (req) =>
    req.continue((reply) => {
      delete reply.headers['content-security-policy']
    }),
  )
  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('Hello<img src="" onerror="console.log(`hacked`)" />')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li', 'Hello')
  cy.get('@log').should('have.been.calledWith', 'hacked')
})

it('stops XSS', () => {
  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('Hello<img src="" onerror="console.log(`hacked`)" />')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li', 'Hello')
  cy.get('@log').should('not.be.called')
})

it('stops XSS and reports CSP violations', () => {
  cy.intercept('/security-attacks', {}).as('cspAttacks')

  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('Hello<img src="" onerror="console.log(`hacked`)" />')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li', 'Hello')

  cy.log('**XSS stopped and reported**')
  cy.wait('@cspAttacks').its('request.body').should('include', 'blocked')
  cy.get('@log').should('not.be.called')
})
