/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { TagGroup, TagItem } from './TagGroup'

describe('TagGroup Component', () => {
  // Example data for tests
  const stringTags = ['First Tag', 'Second Tag', 'Third Tag']
  const typedTags: TagItem[] = [
    { text: 'Default Tag', type: 'default' },
    { text: 'Primary Tag', type: 'primary' },
    { text: 'Success Tag', type: 'success' },
    { text: 'Warning Tag', type: 'warning' },
    { text: 'Danger Tag', type: 'danger' }
  ]

  test('renders single tag correctly', () => {
    render(<TagGroup tags={['Single Tag']} />)
    expect(screen.getByText('Single Tag')).toBeInTheDocument()
  })

  test('renders multiple string tags correctly', () => {
    render(<TagGroup tags={stringTags} />)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  test('renders typed tags with correct intents', () => {
    render(<TagGroup tags={typedTags} />)
    expect(screen.getByText('Default Tag')).toBeInTheDocument()
    expect(screen.getByText('+4')).toBeInTheDocument()
  })
})
