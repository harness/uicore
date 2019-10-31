/// <reference types="Cypress" />

context('<Heading/> Component', () => {
  before(() => {
    cy.visit('/heading')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for Heading component', () => {
    cy.get('#heading-weights').toMatchSnapshot()
    cy.get('#heading-weights').toMatchImageSnapshot()

    cy.get('#heading-block').toMatchSnapshot()
    cy.get('#heading-block').toMatchImageSnapshot()

    cy.get('#heading-inline').toMatchSnapshot()
    cy.get('#heading-inline').toMatchImageSnapshot()

    cy.get('#heading-intent').toMatchSnapshot()
    cy.get('#heading-intent').toMatchImageSnapshot()

    cy.get('#heading-styled-props').toMatchSnapshot()
    cy.get('#heading-styled-props').toMatchImageSnapshot()
  })
})
