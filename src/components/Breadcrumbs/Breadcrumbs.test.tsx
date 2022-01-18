/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Breadcrumbs } from '../..'
import { Breadcrumb } from './Breadcrumbs'

import { BrowserRouter } from 'react-router-dom'

describe('Render basic component', () => {
  test('should check snapshot with name', () => {
    const links: Breadcrumb[] = [
      {
        url: '#',
        label: 'Google',
        iconProps: { name: 'add' }
      },
      {
        url: '#',
        label: 'Gmail',
        iconProps: { name: 'pipeline-approval' }
      },
      {
        url: '#',
        label: 'Gmail2'
      }
    ]
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs links={links} />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})
