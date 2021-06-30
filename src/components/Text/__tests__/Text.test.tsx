import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Text } from '../Text'
import { Layout } from 'layouts/Layout'

describe('Text component fixes', () => {
  test('basic rendering with nested', async () => {
    const { container, getByText, queryByText } = render(
      <Text tooltip="ABC tooltip">
        <Layout.Horizontal>
          <Text>Nested</Text>
        </Layout.Horizontal>
      </Text>
    )
    fireEvent.mouseOver(getByText('Nested'))
    await waitFor(() => expect(queryByText('ABC tooltip')).toBeTruthy())
    expect(container).toMatchSnapshot('nested text')
  })
})
