/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, wait, screen } from '@testing-library/react'
import { StatusBar } from '../StatusBar'
import { Color } from '@harness/design-system'

describe('StatusBar unit tests', () => {
  test('Render a vertical bar', async () => {
    const { container, rerender, getByText } = render(<StatusBar height={100} width={20} background={Color.RED_500} />)
    await wait()

    expect(container.querySelector(`[class*="background-${Color.RED_500}"]`)).not.toBeNull()
    expect(container.querySelector(`[data-name="verticalBar"]`)).not.toBeNull()

    rerender(<StatusBar height={100} width={20} background={Color.YELLOW_200} label="High" />)
    await wait()

    getByText('High')
    expect(container.querySelector(`[class*="background-${Color.YELLOW_200}"]`)).not.toBeNull()
    expect(container.querySelector(`[data-name="verticalBar"]`)).not.toBeNull()
  })

  test.skip('Render a horizontal bar', async () => {
    const gradient = 'linear-gradient(to right, var(--yellow-500), var(--red-500))'
    const { container, rerender, getByText } = render(<StatusBar height={20} width={100} gradient={gradient} />)
    await wait()

    expect(container.querySelector(`[class*="${gradient}"]`)).not.toBeNull()
    expect(container.querySelector(`[data-name="horizontalBar"]`)).not.toBeNull()

    rerender(<StatusBar height={20} width={100} background={Color.BLUE_500} label="In Progress" />)
    await wait()

    getByText('In Progress')
    screen.debug(container)
    expect(container.querySelector(`[class*="background-${Color.BLUE_500}"]`)).not.toBeNull()
    expect(container.querySelector(`[data-name="horizontalBar"]`)).not.toBeNull()
  })
})
