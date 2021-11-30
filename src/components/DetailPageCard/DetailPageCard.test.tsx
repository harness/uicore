import React from 'react'
import { render } from '@testing-library/react'
import DetailPagecard from './DetailPagecard'
describe('Detail Page card', () => {
  test('should render DetailPagecard with title and content', () => {
    const { container } = render(
      <DetailPagecard
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
