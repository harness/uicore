/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
