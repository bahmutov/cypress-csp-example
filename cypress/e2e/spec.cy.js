/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-slow-down
import { slowCypressDown } from 'cypress-slow-down'
// slow down each command by 700ms
// to make the demo videos easier to understand
slowCypressDown(700)

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

it('injecting <script> tag does not work', () => {
  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('Hello<script>console.log(`hacked`)</script>')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li', 'Hello')
  cy.get('@log').should('not.have.been.called')
})

// SKIP disable CSP protection to see the injection
it.skip('injects XSS via img onerror attribute', () => {
  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('Hello<img src="" onerror="console.log(`hacked`)" />')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li', 'Hello')
  cy.get('@log').should('have.been.calledWith', 'hacked')
})

// SKIP disable CSP protection to see the injection
it.skip('injects XSS via b onclick attribute', () => {
  cy.on('window:load', (win) => cy.stub(win.console, 'log').as('log'))
  cy.visit('/')
  cy.get('#message').type('<b onclick="console.log(`hacked`)">Hello</b>')
  cy.contains('button', 'Send').click()
  cy.contains('#messages li b', 'Hello').click()
  cy.get('@log').should('have.been.calledWith', 'hacked')
})
