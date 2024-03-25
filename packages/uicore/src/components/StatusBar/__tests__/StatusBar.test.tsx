/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { render, wait, screen } from '@testing-library/react'
import { StatusBar } from '../StatusBar'
import { Color } from '@harnessio/design-system'

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
