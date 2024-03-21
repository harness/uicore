/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Color } from '@harnessio/design-system'
import { StackedSummaryBar } from '../StackedSummaryBar'

const barData = [
  { color: Color.GREEN_500, count: 50 },
  { color: Color.RED_500, count: 10 }
]

describe('StackedSummaryBar', () => {
  test('Stack without trend', async () => {
    const { container } = render(<StackedSummaryBar barSectionsData={barData} maxCount={100} />)
    expect(container).toMatchSnapshot()
  })

  test('Stack with positive trend', async () => {
    const { container } = render(<StackedSummaryBar barSectionsData={barData} maxCount={100} trend={'10%'} />)
    expect(container).toMatchSnapshot()
  })

  test('Stack with negative trend', async () => {
    const { container } = render(<StackedSummaryBar barSectionsData={barData} maxCount={100} trend={'-10%'} />)
    expect(container).toMatchSnapshot()
  })

  test('Stack with 0 trend', async () => {
    const { container } = render(<StackedSummaryBar barSectionsData={barData} maxCount={100} trend={'0%'} />)
    expect(container).toMatchSnapshot()
  })

  test('Stack with infinity trend', async () => {
    const { container } = render(<StackedSummaryBar barSectionsData={barData} maxCount={100} trend={'infinity%'} />)
    expect(container).toMatchSnapshot()
  })
})
