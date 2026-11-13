/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { IItemRendererProps } from '@blueprintjs/select'

import { getItemRenderer } from '../ExpressionInput'
import { TextAreaEditable } from '../../TextAreaEditable/TextAreaEditable'

describe('<ExpressionInputs /> tests', () => {
  describe('expression text rendering', () => {
    test.each([false, true])('renders literal markup on mount and update when disabled=%s', disabled => {
      const inputRef = React.createRef<HTMLDivElement>()
      const props = {
        name: 'expression',
        inputRef,
        disabled,
        onInput: jest.fn(),
        keyDown: jest.fn(),
        onKeyUp: jest.fn(),
        onMouseUp: jest.fn()
      }
      const value = '<strong>literal &amp; text</strong> <+serviceVariables.name>'
      const { container, rerender } = render(<TextAreaEditable {...props} value={value} />)

      expect(inputRef.current?.textContent).toBe(value)
      expect(container.querySelector('strong')).toBeNull()
      expect(container.querySelectorAll('span')).toHaveLength(1)
      expect(container.querySelector('span')?.textContent).toBe('<+serviceVariables.name>')

      const updatedValue = '<em>updated</em> & <+pipeline.name>'
      rerender(<TextAreaEditable {...props} value={updatedValue} />)

      expect(inputRef.current?.textContent).toBe(updatedValue)
      expect(container.querySelector('em')).toBeNull()
      expect(container.querySelectorAll('span')).toHaveLength(1)
      expect(container.querySelector('span')?.textContent).toBe('<+pipeline.name>')
    })

    test.each([false, true])('renders the reported payload as inert text when disabled=%s', disabled => {
      const inputRef = React.createRef<HTMLDivElement>()
      const props = {
        name: 'expression',
        inputRef,
        disabled,
        onInput: jest.fn(),
        keyDown: jest.fn(),
        onKeyUp: jest.fn(),
        onMouseUp: jest.fn()
      }
      const payload = '<+a><img src=x onerror=alert(document.domain)>'
      const { container, rerender } = render(<TextAreaEditable {...props} value={payload} />)
      const expectInertPayload = (): void => {
        expect(inputRef.current?.textContent).toBe(payload)
        expect(container.querySelector('img, [onerror]')).toBeNull()
        expect(container.querySelectorAll('span')).toHaveLength(1)
        expect(container.querySelector('span')?.textContent).toBe('<+a>')
      }

      expectInertPayload()
      rerender(<TextAreaEditable {...props} value="ordinary text" />)
      expect(inputRef.current?.textContent).toBe('ordinary text')
      rerender(<TextAreaEditable {...props} value={payload} />)
      expectInertPayload()
    })
  })

  describe('getItemRenderer tests', () => {
    test('works irrespective of case', () => {
      const itemRenderer = getItemRenderer(jest.fn())
      const itemProps: IItemRendererProps = {
        query: '<+name',
        handleClick: jest.fn(),
        modifiers: { active: true, disabled: true, matchesPredicate: true }
      }
      const { container: container1 } = render(itemRenderer('app.name', itemProps) as React.ReactElement)

      expect(container1).toMatchSnapshot()
      expect(container1.querySelector('mark')?.innerHTML).toBe('name')

      const { container: container2 } = render(itemRenderer('app.Name', itemProps) as React.ReactElement)

      expect(container2).toMatchSnapshot()
      expect(container2.querySelector('mark')?.innerHTML).toBe('Name')

      const { container: container3 } = render(
        itemRenderer('app.xyz.name', { ...itemProps, query: '<+xyz' }) as React.ReactElement
      )

      expect(container3).toMatchSnapshot()
      expect(container3.querySelector('mark')?.innerHTML).toBe('xyz')
    })
  })
})
