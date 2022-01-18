/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Accordion } from './Accordion'

const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi temporibus error, id recusandae doloribus earum inventore, soluta fugit quidem nulla labore optio incidunt quis facilis. Rem illum unde tempore tempora.`

function TestComponent(props: { activeId?: string }) {
  return (
    <Accordion activeId={props.activeId} collapseProps={{ transitionDuration: 0 }}>
      <Accordion.Panel id="panel-1" summary="Panel 1" details={text} />
      <Accordion.Panel id="panel-2" summary="Panel 2" details={text} />
      <div>{text}</div>
    </Accordion>
  )
}

jest.useFakeTimers()

describe('<Accordion /> tests', () => {
  test('snapshot test', () => {
    const { container, getByTestId } = render(<TestComponent />)
    expect(container).toMatchSnapshot()

    expect(() => getByTestId('panel-1-details')).toThrow()
    expect(() => getByTestId('panel-2-details')).toThrow()

    expect(getByTestId('panel-1-panel').dataset.open).toBe('false')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('false')
  })

  test('toggle works between panels', async () => {
    const { container, getByTestId } = render(<TestComponent activeId="panel-1" />)
    expect(container).toMatchSnapshot('Panel 1 open')

    expect(getByTestId('panel-1-details')).toBeDefined()
    expect(() => getByTestId('panel-2-details')).toThrow()

    expect(getByTestId('panel-1-panel').dataset.open).toBe('true')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('false')

    fireEvent.click(getByTestId('panel-2-summary'))

    expect(getByTestId('panel-1-panel').dataset.open).toBe('false')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('true')

    expect(getByTestId('panel-2-details')).toBeDefined()
    expect(container).toMatchSnapshot('Panel 2 open')
  })

  test('toggle works for same panel', async () => {
    const { container, getByTestId } = render(<TestComponent activeId="panel-1" />)
    expect(container).toMatchSnapshot('Panel 1 open')

    expect(getByTestId('panel-1-details')).toBeDefined()
    expect(() => getByTestId('panel-2-details')).toThrow()

    expect(getByTestId('panel-1-panel').dataset.open).toBe('true')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('false')

    fireEvent.click(getByTestId('panel-1-summary'))

    expect(getByTestId('panel-1-panel').dataset.open).toBe('false')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('false')

    expect(container).toMatchSnapshot('Panel 1 closed')
  })
})
