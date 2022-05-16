/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, wait } from '@testing-library/react'
import { GraphError } from '../GraphError'

describe('GraphError unit tests', () => {
  test('Render GraphError with title and link should match snapshot', async () => {
    const { container } = render(
      <GraphError linkText={'View in Splunk'} onLinkClick={() => void 0} title={'Error occured'} />
    )
    await wait()
    expect(container).toMatchSnapshot()
  })

  test('Render GraphError with title and link should render title and link', async () => {
    const { container } = render(
      <GraphError linkText={'View in Splunk'} onLinkClick={() => void 0} title={'Error occured'} />
    )
    await wait()
    expect(container.querySelector('[class*="title"]')).not.toBeNull()
    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('a[href]')).toBeNull()
  })

  test('Render GraphError with title, image and no link should render image, title and link without href', async () => {
    const { container } = render(
      <GraphError
        linkText={'View in Splunk'}
        image={'someimg'}
        link={'https://www.google.com'}
        title={'Error occured'}
      />
    )
    await wait()
    expect(container.querySelector('[class*="title"]')).not.toBeNull()
    expect(container.querySelector('img')).not.toBeNull()
    expect(container.querySelector('svg')).toBeNull()
    expect(container.querySelector('a[href]')).not.toBeNull()
  })
})
