/// <reference types="Cypress" />

context('<Text/> Component', () => {
  before(() => {
    cy.visit('http://localhost:3000/text')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for Text component', () => {
    cy.get('#text-font-size').toMatchSnapshot()
    cy.get('#text-font-size').toMatchImageSnapshot()

    cy.get('#text-weight').toMatchSnapshot()
    cy.get('#text-weight').toMatchImageSnapshot()

    cy.get('#text-mono').toMatchSnapshot()
    cy.get('#text-mono').toMatchImageSnapshot()

    cy.get('#text-intent').toMatchSnapshot()
    cy.get('#text-intent').toMatchImageSnapshot()

    cy.get('#text-styled-props').toMatchSnapshot()
    cy.get('#text-styled-props').toMatchImageSnapshot()
  })
})
