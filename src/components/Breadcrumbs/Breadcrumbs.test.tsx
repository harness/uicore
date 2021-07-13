import React from 'react'
import { render } from '@testing-library/react'
import { Breadcrumbs } from '../..'
import { Breadcrumb } from './Breadcrumbs'

import { BrowserRouter } from 'react-router-dom'

describe('Render basic component', () => {
  test('should check snapshot with name', () => {
    const links: Breadcrumb[] = [
      {
        url: '#',
        label: 'Google',
        icon: 'add'
      },
      {
        url: '#',
        label: 'Gmail',
        icon: 'airplane'
      },
      {
        url: '#',
        label: 'Gmail2'
      }
    ]
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs links={links} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})
