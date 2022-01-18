/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SparkChart } from '../SparkChart'
import { Color } from 'core/Color'

describe('SparkChrt unit tests', () => {
  test('render spark chart with data', () => {
    const { container } = render(<SparkChart data={[2, 3, 4, 1, 5, 2, 5]} />)

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
  })

  test('render spark chart with data', () => {
    const { container } = render(<SparkChart data={[2, 3, 4, 1, 5, 2, 5]} data2={[0, 1, 2, 0, 0, 2, 1]} />)

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
  })

  test('render spark chart with custom props', () => {
    const mockOnClick = jest.fn(() => void 0)
    const { container, getByRole } = render(
      <SparkChart data={[2, 3, 4, 1, 5, 2, 5]} onClick={mockOnClick} color={Color.BLACK} className={'custom'} />
    )

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
    fireEvent.click(getByRole('spark-chart'))
    expect(mockOnClick).toBeCalled()
  })
})
