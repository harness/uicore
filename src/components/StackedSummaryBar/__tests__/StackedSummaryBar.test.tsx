/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Color } from '@harness/design-system'
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
