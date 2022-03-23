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
        progressMap={
          new Map([
            [0, 'SUCCESS'],
            [1, 'FAILED'],
            [2, 'INPROGRESS'],
            [3, 'TODO']
          ])
        }
      />
    )
    expect(document.body.getElementsByClassName('bp3-icon StyledProps--main').length).toBe(3)
    expect(document.body.getElementsByClassName('bar').length).toBe(3)
    expect(document.body.getElementsByClassName('bar barSuccess').length).toBe(1)

    expect(container).toMatchSnapshot()
  })
})
