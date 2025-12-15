/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Thumbnail } from './Thumbnail'

describe('Thumbnail component', () => {
  test('renders thumbnail with icon and label', () => {
    const { container } = render(<Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders thumbnail with image', () => {
    const { container } = render(
      <Thumbnail imageProps={{ src: 'test.jpg', alt: 'Test Image' }} label="Test" value="test" />
    )
    expect(screen.getByAltText('Test Image')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders thumbnail with label only', () => {
    const { container } = render(<Thumbnail label="Label Only" value="label" />)
    expect(screen.getByText('Label Only')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders thumbnail with React element as label', () => {
    const customLabel = <div data-testid="custom-label">Custom Label</div>
    const { container } = render(<Thumbnail label={customLabel} value="custom" />)
    expect(screen.getByTestId('custom-label')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders selected thumbnail', () => {
    const { container } = render(<Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" selected />)
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
    expect(container).toMatchSnapshot()
  })

  test('renders disabled thumbnail', () => {
    const { container } = render(<Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" disabled />)
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(checkbox.disabled).toBe(true)
    expect(container).toMatchSnapshot()
  })

  test('handles onClick event', () => {
    const onClick = jest.fn()
    const { container } = render(
      <Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" onClick={onClick} />
    )
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    fireEvent.click(checkbox)
    expect(onClick).toHaveBeenCalled()
  })

  test('renders large size thumbnail', () => {
    const { container } = render(
      <Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" size="large" />
    )
    expect(container).toMatchSnapshot()
  })

  test('applies custom className', () => {
    const { container } = render(
      <Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" className="custom-class" />
    )
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })

  test('renders with name attribute', () => {
    const { container } = render(
      <Thumbnail icon="main-dashboard" label="Dashboard" value="dashboard" name="thumbnail-name" />
    )
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    expect(checkbox.name).toBe('thumbnail-name')
  })

  test('renders image with custom className', () => {
    const { container } = render(
      <Thumbnail imageProps={{ src: 'test.jpg', alt: 'Test', className: 'custom-image' }} label="Test" value="test" />
    )
    expect(container.querySelector('.custom-image')).toBeTruthy()
  })
})
