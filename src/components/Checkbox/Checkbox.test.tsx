import React from 'react'
import { render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  test("it should toggle the input's checked state when clicked", async () => {
    render(<Checkbox />)

    const input = screen.getByRole('checkbox')
    expect(input).toBeInTheDocument()
    expect(input).not.toBeChecked()

    input?.parentElement?.click()
    expect(input).toBeChecked()

    input?.parentElement?.click()
    expect(input).not.toBeChecked()
  })

  test('it should be able to render as indeterminate', async () => {
    render(<Checkbox indeterminate />)

    const input = screen.getByRole('checkbox')
    expect(input).toBeInTheDocument()
    expect(input).not.toBeChecked()
    expect(input).toHaveProperty('indeterminate')
  })
})
