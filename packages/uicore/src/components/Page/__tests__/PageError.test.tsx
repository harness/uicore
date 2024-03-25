/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Layout, Text } from 'index'
import { render } from '@testing-library/react'
import { PageError } from '../PageError'

describe('PageError test', () => {
  test('Rendering error with no message', () => {
    const { container } = render(<PageError />)
    expect(container).toMatchSnapshot()
  })

  test('Rendering error with a string', () => {
    const { container } = render(<PageError message="Invalid Request" />)
    expect(container).toMatchSnapshot()
  })

  test('Rendering error with a React Node', () => {
    const reactNode = (): React.ReactElement => (
      <Layout.Vertical>
        <Text>You are missing the following permission:</Text>
      </Layout.Vertical>
    )
    const { container } = render(<PageError message={reactNode()} />)
    expect(container).toMatchSnapshot()
  })
})
