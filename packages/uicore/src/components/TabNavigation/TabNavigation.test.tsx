/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { TabNavigation } from './TabNavigation'

describe('TabNavigation component', () => {
  const mockLinks = [
    { label: 'Home', to: '/home' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ]

  test('renders navigation links', () => {
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={mockLinks} />
      </BrowserRouter>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders with small size', () => {
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={mockLinks} size="small" />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders disabled link', () => {
    const linksWithDisabled = [
      { label: 'Home', to: '/home' },
      { label: 'About', to: '/about', disabled: true }
    ]
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={linksWithDisabled} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders with exact prop', () => {
    const linksWithExact = [
      { label: 'Home', to: '/home', exact: true },
      { label: 'About', to: '/about' }
    ]
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={linksWithExact} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders with strict prop', () => {
    const linksWithStrict = [
      { label: 'Home', to: '/home', strict: true },
      { label: 'About', to: '/about' }
    ]
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={linksWithStrict} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders empty links array', () => {
    const { container } = render(
      <BrowserRouter {...({} as any)}>
        <TabNavigation links={[]} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})
