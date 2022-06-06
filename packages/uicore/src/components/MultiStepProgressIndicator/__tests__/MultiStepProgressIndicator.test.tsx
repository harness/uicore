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

    const noOfSuccessfulSteps = 1
    const noOfNotSuccessfulSteps = 3

    // show should 3 grey dots
    expect(document.body.getElementsByClassName('dot dotOutLine spacing').length).toBe(noOfNotSuccessfulSteps)
    // should show 1 blue success dot
    expect(document.body.getElementsByClassName('dot dotSuccess spacing').length).toBe(noOfSuccessfulSteps)

    // show should 2 full grey and 1 half bar
    expect(document.body.getElementsByClassName('bar fullBar').length).toBe(noOfNotSuccessfulSteps)
    // should show 1 blue success half bar
    expect(document.body.getElementsByClassName('bar barSuccess halfBar').length).toBe(noOfSuccessfulSteps)

    expect(container).toMatchSnapshot()
  })
})
