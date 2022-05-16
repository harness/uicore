/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { DetailPageCard } from './DetailPageCard'
describe('Detail Page card', () => {
  test('should render DetailPagecard with title and content', () => {
    const { container } = render(
      <DetailPageCard
        title="Overview"
        content={[
          { label: 'Name', value: 'Cluster Name' },
          { label: 'GitOps Agent ', value: 'Agent 1' }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
