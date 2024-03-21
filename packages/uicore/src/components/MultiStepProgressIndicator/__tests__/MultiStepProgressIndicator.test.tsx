/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
            [0, { StepStatus: 'SUCCESS', StepName: 'StepName1' }],
            [1, { StepStatus: 'SUCCESS', StepName: 'StepName2' }],
            [2, { StepStatus: 'INPROGRESS', StepName: 'StepName3' }],
            [3, { StepStatus: 'TODO', StepName: 'StepName4' }]
          ])
        }
      />
    )

    // show stepname
    expect(document.body.getElementsByClassName('dotNameSuccess').length).toBe(3)
    expect(document.body.getElementsByClassName('dotNameFailed').length).toBe(1)

    //  should  show 1 grey dot
    expect(document.body.getElementsByClassName('dot dotOutLine spacing').length).toBe(1)
    // should show 3 blue success dot
    expect(document.body.getElementsByClassName('dot dotSuccess spacing').length).toBe(3)

    // show should  full bar which will be overlapped by half bar if successfull
    expect(document.body.getElementsByClassName('bar fullBar').length).toBe(3)

    // should show 1 blue success half bar
    expect(document.body.getElementsByClassName('bar barSuccess halfBar').length).toBe(1)

    expect(container).toMatchSnapshot()
  })
})
