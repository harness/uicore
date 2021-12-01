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
