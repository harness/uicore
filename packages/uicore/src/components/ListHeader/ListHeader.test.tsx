/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ListHeader } from './ListHeader'

describe('ListHeader component', () => {
  const mockSortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Date', value: 'date' }
  ]
  const mockOnSortMethodChange = jest.fn()
  const mockSelectedSortMethod = 'name'

  test('renders with total count', () => {
    const { container } = render(
      <ListHeader
        totalCount={10}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
      />
    )
    expect(screen.getByText('Total: 10')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders with zero count', () => {
    const { container } = render(
      <ListHeader
        totalCount={0}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
      />
    )
    expect(screen.getByText('Total: 0')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders without total count', () => {
    const { container } = render(
      <ListHeader
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
      />
    )
    expect(screen.getByText('Total:')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders with preDropdownContent', () => {
    const preContent = <div data-testid="pre-content">Pre Content</div>
    const { container } = render(
      <ListHeader
        totalCount={5}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
        preDropdownContent={preContent}
      />
    )
    expect(screen.getByTestId('pre-content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders with postDropdownContent', () => {
    const postContent = <div data-testid="post-content">Post Content</div>
    const { container } = render(
      <ListHeader
        totalCount={5}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
        postDropdownContent={postContent}
      />
    )
    expect(screen.getByTestId('post-content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('applies custom className', () => {
    const { container } = render(
      <ListHeader
        totalCount={5}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
        className="custom-class"
      />
    )
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })

  test('renders with both pre and post dropdown content', () => {
    const preContent = <div data-testid="pre-content">Pre</div>
    const postContent = <div data-testid="post-content">Post</div>
    const { container } = render(
      <ListHeader
        totalCount={5}
        sortOptions={mockSortOptions}
        onSortMethodChange={mockOnSortMethodChange}
        selectedSortMethod={mockSelectedSortMethod}
        preDropdownContent={preContent}
        postDropdownContent={postContent}
      />
    )
    expect(screen.getByTestId('pre-content')).toBeInTheDocument()
    expect(screen.getByTestId('post-content')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
