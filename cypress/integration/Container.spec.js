/// <reference types="Cypress" />

context('<Container/> Component', () => {
  before(() => {
    cy.visit('/container')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for Container component', () => {
    cy.get('#sample-container-1').toMatchSnapshot()
    cy.get('#sample-container-1').toMatchImageSnapshot()

    cy.get('#sample-container-2').toMatchSnapshot()
    cy.get('#sample-container-2').toMatchImageSnapshot()
  })
})
