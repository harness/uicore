/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { NewLineText } from './NewLineText'

describe('NewLineText Component', () => {
  // Example text with line breaks
  const exampleText = 'This is line one.\nThis is line two.\nThis is line three.\nThis is line four.'

  test('renders text with line breaks correctly', () => {
    render(<NewLineText>{exampleText}</NewLineText>)
    expect(screen.getByText('This is line one.')).toBeInTheDocument()
    expect(screen.getByText('This is line two.')).toBeInTheDocument()
    expect(screen.getByText('This is line three.')).toBeInTheDocument()
    expect(screen.getByText('This is line four.')).toBeInTheDocument()
  })

  test('handles line clamping correctly', () => {
    render(<NewLineText lineClamp={2}>{exampleText}</NewLineText>)
    expect(screen.getByText('This is line one.')).toBeInTheDocument()
    expect(screen.getByText('This is line two....')).toBeInTheDocument()
    expect(screen.queryByText('This is line three.')).not.toBeInTheDocument()
    expect(screen.queryByText('This is line four.')).not.toBeInTheDocument()
  })
})
