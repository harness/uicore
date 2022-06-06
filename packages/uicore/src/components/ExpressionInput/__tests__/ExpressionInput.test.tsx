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

describe('<ExpressionInputs /> tests', () => {
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
