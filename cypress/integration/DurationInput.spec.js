/// <reference types="Cypress" />

context('<DurationInput /> Component', () => {
  before(() => {
    cy.visit('/durationinput')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for DurationInput component', () => {
    cy.get('#duration-input-1').toMatchSnapshot()
    cy.get('#duration-input-1').toMatchImageSnapshot()

    cy.get('#duration-input-example').toMatchSnapshot()
    cy.get('#duration-input-example').toMatchImageSnapshot()
  })
})
