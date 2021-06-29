import React from 'react'
import { render } from '@testing-library/react'
import { Text } from '../Text'
import { Layout } from 'layouts/Layout'

describe('Text component fixes', () => {
  test('basic rendering with nested', () => {
    const { container } = render(
      <Text tooltip="ABC tooltip">
        <Layout.Horizontal>
          <Text>Nested</Text>
        </Layout.Horizontal>
      </Text>
    )
    expect(container).toMatchSnapshot('nested text with div instead of p')
  })
})
