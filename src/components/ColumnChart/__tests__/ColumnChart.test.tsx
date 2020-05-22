import React from 'react'
import { render, wait } from '@testing-library/react'
import { ColumnChart } from '../ColumnChart'

describe('ColumnChart unit tests', () => {
  test('Render ColumnChart should match snapshot', async () => {
    const { container } = render(<ColumnChart />)
    await wait()
    expect(container).toMatchSnapshot()
  })
})
