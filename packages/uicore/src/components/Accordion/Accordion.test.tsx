/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { act, render, fireEvent } from '@testing-library/react'

import { Accordion, AccordionHandle } from './Accordion'

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

  test('onUserToggle is called only for user-initiated panel toggles', () => {
    const onUserToggle = jest.fn()
    const accordionRef = React.createRef<AccordionHandle>()
    const { getByTestId } = render(
      <Accordion ref={accordionRef} onUserToggle={onUserToggle} collapseProps={{ transitionDuration: 0 }}>
        <Accordion.Panel id="panel-1" summary="Panel 1" details={text} />
        <Accordion.Panel id="panel-2" summary="Panel 2" details={text} />
      </Accordion>
    )

    fireEvent.click(getByTestId('panel-1-summary'))
    expect(onUserToggle).toHaveBeenCalledTimes(1)
    expect(onUserToggle).toHaveBeenCalledWith('panel-1', true)

    fireEvent.click(getByTestId('panel-1-summary'))
    expect(onUserToggle).toHaveBeenLastCalledWith('panel-1', false)

    onUserToggle.mockClear()
    act(() => {
      accordionRef.current?.open('panel-2')
      accordionRef.current?.close('panel-2')
      accordionRef.current?.toggle('panel-2')
    })
    expect(onUserToggle).not.toHaveBeenCalled()
  })

  test('onUserToggle is not called for disabled panels', () => {
    const onUserToggle = jest.fn()
    const { getByTestId } = render(
      <Accordion onUserToggle={onUserToggle} collapseProps={{ transitionDuration: 0 }}>
        <Accordion.Panel id="panel-1" summary="Panel 1" details={text} disabled />
      </Accordion>
    )

    fireEvent.click(getByTestId('panel-1-summary'))
    expect(onUserToggle).not.toHaveBeenCalled()
  })
})
