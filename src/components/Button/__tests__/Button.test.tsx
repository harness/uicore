import React from 'react'
import { render } from '@testing-library/react'

import { Button } from '../Button'

describe('<Button /> tests', () => {
  test('snapshot test', () => {
    const { container } = render(<Button>Click Me!</Button>)

    expect(container).toMatchSnapshot()
  })

  test('renders icon as functional components', () => {
    const { container } = render(<Button icon={() => <div>ICON!</div>}>Click Me!</Button>)
    expect(container).toMatchSnapshot()
  })
})
