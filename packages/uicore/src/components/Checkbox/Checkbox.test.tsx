/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  test("it should toggle the input's checked state when clicked", async () => {
    render(<Checkbox />)

    const input = screen.getByRole('checkbox')
    expect(input).toBeInTheDocument()
    expect(input).not.toBeChecked()

    input?.parentElement?.click()
    expect(input).toBeChecked()

    input?.parentElement?.click()
    expect(input).not.toBeChecked()
  })

  test('it should be able to render as indeterminate', async () => {
    render(<Checkbox indeterminate />)

    const input = screen.getByRole('checkbox')
    expect(input).toBeInTheDocument()
    expect(input).not.toBeChecked()
    expect(input).toHaveProperty('indeterminate')
  })
})
