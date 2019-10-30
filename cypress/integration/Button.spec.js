/// <reference types="Cypress" />

context('<Button/> Component', () => {
  before(() => {
    cy.visit('/button')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for Button component', () => {
    cy.get('#primary-buttons').toMatchSnapshot()
    cy.get('#primary-buttons').toMatchImageSnapshot()

    cy.get('#primary-borderless-buttons').toMatchSnapshot()
    cy.get('#primary-borderless-buttons').toMatchImageSnapshot()

    cy.get('#secondary-buttons').toMatchSnapshot()
    cy.get('#secondary-buttons').toMatchImageSnapshot()

    cy.get('#secondary-borderless-buttons').toMatchSnapshot()
    cy.get('#secondary-borderless-buttons').toMatchImageSnapshot()

    cy.get('#success-buttons').toMatchSnapshot()
    cy.get('#success-buttons').toMatchImageSnapshot()

    cy.get('#warning-buttons').toMatchSnapshot()
    cy.get('#warning-buttons').toMatchImageSnapshot()

    cy.get('#danger-buttons').toMatchSnapshot()
    cy.get('#danger-buttons').toMatchImageSnapshot()
  })
})
