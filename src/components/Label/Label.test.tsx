import React from 'react'
import { render } from '@testing-library/react'

import { Label } from './Label'

describe('<Label /> tests', () => {
  test('snapshot test', () => {
    const { container } = render(<Label>Test label</Label>)
    expect(container).toMatchSnapshot()
  })
})
