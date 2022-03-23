/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { MultiStepProgressIndicator } from '../MultiStepProgressIndicator'

describe('Test MultiStepProgressIndicator', () => {
  test('Basic render', () => {
    const { container } = render(
      <MultiStepProgressIndicator
        stepProgress={[
          { stepIndex: 0, stepStatus: 'SUCCESS' },
          { stepIndex: 1, stepStatus: 'FAILED' },
          { stepIndex: 2, stepStatus: 'INPROGRESS' },
          { stepIndex: 3, stepStatus: 'TODO' }
        ]}
      />
    )
    expect(document.body.getElementsByClassName('bp3-icon StyledProps--main').length).toBe(3)
    expect(document.body.getElementsByClassName('bar').length).toBe(3)
    expect(document.body.getElementsByClassName('bar barSuccess').length).toBe(1)

    expect(container).toMatchSnapshot()
  })
})
