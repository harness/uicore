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
      // expect(container2.querySelector('mark')?.innerHTML).toBe('Name')
    })
  })
})
