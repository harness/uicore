import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { ModalErrorHandler, ModalErrorHandlerBinding } from '../ModalErrorHandler'

const primaryError = {
  code: 'INVALID_REQUEST',
  level: 'ERROR',
  message:
    'Invalid request: Cannot use same Publish Variable Name [Info] in multiple Approval stages. Publish Variable Name [Info] already used in stage [STAGE 1]'
}
const secondaryErrors = [
  {
    code: 'INVALID_REQUEST',
    level: 'ERROR',
    message: 'Stack Trace 1'
  },

  {
    code: 'INVALID_REQUEST',
    level: 'ERROR',
    message: 'Stack Trace 2'
  }
]
const hint = { code: 'HINT', level: 'INFO', message: 'Give each Approval stage a unique Publish Variable Name' }
const explanation = {
  code: 'EXPLANATION',
  level: 'INFO',
  message: "Each Publish Variable Name is used to distinguish one stage's variables."
}
const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const docsLink = 'https://docs.harness.com'
const iconName = 'airplane'

describe('ModalErrorHandler Tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('ModalErrorHandler should render success message', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showSuccess(message) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    // icon should be rendered
    expect(container.querySelector('span[icon] svg')).toBeTruthy()

    // success message should be rendered
    expect(container.querySelector('[class*=green][data-type="single-message"]')?.textContent).toEqual(message)
  })

  test('ModalErrorHandler should render success message with options', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showSuccess(message, docsLink, iconName) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    expect(container.querySelector(`span[icon=${iconName}] svg`)).toBeTruthy()
    expect(container.querySelector(`a[href="${docsLink}"]`)).toBeTruthy()
  })

  test('ModalErrorHandler should render warning message', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showWarning(message) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    // icon should be rendered
    expect(container.querySelector('span[icon] svg')).toBeTruthy()

    // success message should be rendered
    expect(container.querySelector('[class*=yellow][data-type="single-message"]')?.textContent).toEqual(message)
  })

  test('ModalErrorHandler should render warning message with options', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showWarning(message, docsLink, iconName) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    expect(container.querySelector(`span[icon=${iconName}] svg`)).toBeTruthy()
    expect(container.querySelector(`a[href="${docsLink}"]`)).toBeTruthy()
  })

  test('ModalErrorHandler should render danger message', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showDanger(message) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    // icon should be rendered
    expect(container.querySelector('span[icon] svg')).toBeTruthy()

    // success message should be rendered
    expect(container.querySelector('[class*=red][data-type="single-message"]')?.textContent).toEqual(message)
  })

  test('ModalErrorHandler should render danger message with options', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showDanger(message, docsLink, iconName) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    expect(container.querySelector(`span[icon=${iconName}] svg`)).toBeTruthy()
    expect(container.querySelector(`a[href="${docsLink}"]`)).toBeTruthy()
  })

  test('ModalErrorHandler should hide properly 1', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )
    modalErrorHandler!.show([primaryError, ...secondaryErrors, hint, explanation]) // eslint-disable-line @typescript-eslint/no-non-null-assertion

    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    modalErrorHandler!.hide() // eslint-disable-line @typescript-eslint/no-non-null-assertion
    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)
    expect(container.innerHTML).toEqual('')
  })

  test('ModalErrorHandler should hide properly 2', () => {
    let modalErrorHandler: ModalErrorHandlerBinding
    const { container, rerender } = render(
      <ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />
    )

    modalErrorHandler!.showDanger(message) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)

    modalErrorHandler!.hide() // eslint-disable-line @typescript-eslint/no-non-null-assertion
    rerender(<ModalErrorHandler bind={_modalErrorHandler => (modalErrorHandler = _modalErrorHandler)} />)
    expect(container.innerHTML).toEqual('')
  })
})
