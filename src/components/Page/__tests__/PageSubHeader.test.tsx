/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { noop } from 'lodash-es'
import { render } from '@testing-library/react'
import { Button } from '../../../'
import { PageSubHeader } from '../PageSubHeader'

describe('PageSubHeader test', () => {
  test('snapshot testing', () => {
    const { container } = render(
      <PageSubHeader>
        <Button intent="primary" data-testid="add-pipeline" text={'Add Pipeline'} onClick={noop} />
      </PageSubHeader>
    )
    expect(container).toMatchSnapshot()
  })
})
