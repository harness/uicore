/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Text } from '../Text'
import { Layout } from 'layouts/Layout'

describe('Text component fixes', () => {
  test('basic rendering with nested', async () => {
    const { container, getByText, queryByText } = render(
      <Text tooltip="ABC tooltip">
        <Layout.Horizontal>
          <Text>Nested</Text>
        </Layout.Horizontal>
      </Text>
    )
    fireEvent.mouseOver(getByText('Nested'))
    await waitFor(() => expect(queryByText('ABC tooltip')).toBeTruthy())
    expect(container).toMatchSnapshot('nested text')
  })
})
