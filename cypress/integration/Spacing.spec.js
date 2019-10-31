/// <reference types="Cypress" />

context('Spacing: Margin and Padding', () => {
  before(() => {
    cy.visit('/spacing')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for Spacing props', () => {
    cy.get('#spacing-margin-padding').toMatchSnapshot()
    cy.get('#spacing-margin-padding').toMatchImageSnapshot()
  })
})
