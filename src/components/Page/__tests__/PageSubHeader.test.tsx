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
