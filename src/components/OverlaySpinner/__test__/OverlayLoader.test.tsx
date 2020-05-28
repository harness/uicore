import React from 'react'
import { render, queryByAttribute } from '@testing-library/react'
import { OverlaySpinner } from '../OverlaySpinner'

jest.useFakeTimers()

const DummyComponent = () => <div>DummyComponent</div>

describe('OverlayLoader Test', () => {
  test('', () => {
    const { rerender } = render(
      <OverlaySpinner show={false}>
        <DummyComponent />
      </OverlaySpinner>
    )
    expect(document.body).toMatchSnapshot()
    rerender(
      <OverlaySpinner show={true}>
        <DummyComponent />
      </OverlaySpinner>
    )
    expect(queryByAttribute('class', document.body, 'bp3-spinner')).not.toBeNull()
    expect(document.body).toMatchSnapshot()
  })
})
