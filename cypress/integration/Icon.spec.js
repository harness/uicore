/// <reference types="Cypress" />

context('<Icon/> Component', () => {
  before(() => {
    cy.visit('/icon')
    cy.hideStickyHeader()
  })

  after(() => {
    cy.showStickyHeader()
  })

  it('snapshots for <Icon/> with colors', () => {
    cy.get('#color-icons').toMatchSnapshot()
    cy.get('#color-icons').toMatchImageSnapshot()
  })

  it('snapshots for <Icon/> with styled props', () => {
    cy.get('#icon-styled-props').toMatchSnapshot()
    cy.get('#icon-styled-props').toMatchImageSnapshot()
  })

  it('snapshots for <Icon/> alias to Blueprint icons', () => {
    cy.get('#blueprint-icons').toMatchSnapshot()
    cy.get('#blueprint-icons').toMatchImageSnapshot()
  })

  it('snapshots for Harness <Icon/>', () => {
    cy.get('#harness-icons').toMatchSnapshot()
    cy.get('#harness-icons').toMatchImageSnapshot()
  })
})
