import React, { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IOptionProps } from '@blueprintjs/core/src/common/props'
import { RadioButtonGroup } from '../RadioButtonGroup'

const TestRadioButtonGroupController = ({ options }: { options: IOptionProps[] }) => {
  const [currentSelected, setCurrentSelected] = useState<string>('')

  return (
    <RadioButtonGroup
      selectedValue={currentSelected}
      onChange={({ currentTarget: { value } }) => setCurrentSelected(value)}
      options={options}
    />
  )
}

describe('RadioButtonGroup', () => {
  test('it should only have one radio selected at a time', async () => {
    render(
      <TestRadioButtonGroupController
        options={[
          { label: 'r1', value: 'r1' },
          { label: 'r2', value: 'r2' },
          { label: 'r3', value: 'r3' }
        ]}
      />
    )

    const r1 = screen.getByLabelText('r1')
    const r2 = screen.getByLabelText('r2')
    const r3 = screen.getByLabelText('r3')

    expect(r1).not.toBeChecked()
    expect(r2).not.toBeChecked()
    expect(r3).not.toBeChecked()

    userEvent.click(r1)
    await waitFor(() => {
      expect(r1).toBeChecked()
      expect(r2).not.toBeChecked()
      expect(r3).not.toBeChecked()
    })

    userEvent.click(r2)
    await waitFor(() => {
      expect(r1).not.toBeChecked()
      expect(r2).toBeChecked()
      expect(r3).not.toBeChecked()
    })

    userEvent.click(r3)
    await waitFor(() => {
      expect(r1).not.toBeChecked()
      expect(r2).not.toBeChecked()
      expect(r3).toBeChecked()
    })
  })

  test('it should not allow selection of disabled options', async () => {
    render(
      <TestRadioButtonGroupController
        options={[
          { label: 'e1', value: 'e1' },
          { label: 'd1', value: 'd1', disabled: true }
        ]}
      />
    )

    const e1 = screen.getByLabelText('e1')
    const d1 = screen.getByLabelText('d1')

    expect(e1).not.toBeChecked()
    expect(d1).not.toBeChecked()
    expect(d1).toBeDisabled()

    userEvent.click(e1)
    await waitFor(() => {
      expect(e1).toBeChecked()
      expect(d1).not.toBeChecked()
    })

    userEvent.click(d1)
    await waitFor(() => {
      expect(e1).toBeChecked()
      expect(d1).not.toBeChecked()
    })
  })
})
