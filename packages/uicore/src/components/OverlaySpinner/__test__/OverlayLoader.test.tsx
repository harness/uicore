/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, queryByAttribute } from '@testing-library/react'
import { OverlaySpinner } from '../OverlaySpinner'

jest.useFakeTimers()

const DummyComponent = () => <div>DummyComponent</div>

describe('OverlayLoader Test', () => {
  test('', () => {
    const { rerender } = render(
      <OverlaySpinner show={false}>
        <DummyComponent />
      </OverlaySpinner>
    )
    expect(document.body).toMatchSnapshot()
    rerender(
      <OverlaySpinner show={true}>
        <DummyComponent />
      </OverlaySpinner>
    )
    expect(queryByAttribute('class', document.body, 'bp3-spinner')).not.toBeNull()
    expect(document.body).toMatchSnapshot()
  })
})
