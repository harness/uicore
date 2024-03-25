/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { StepsProgress } from './StepsProgress'
import { Intent } from '@blueprintjs/core'

describe('Steps Progress Component', () => {
  test('should render with default steps', () => {
    const { container } = render(
      <StepsProgress
        steps={[
          'Checking Delegate',
          'Establising Connection with the Delegate and Kubernetes',
          'Checking for heartbeat',
          'Verifying Connection'
        ]}
        intent={Intent.DANGER}
        current={3}
        currentStatus={'ERROR'}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
