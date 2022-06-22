/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
    const { container } = render(<PageError message={reactNode} />)
    expect(container).toMatchSnapshot()
  })
})
