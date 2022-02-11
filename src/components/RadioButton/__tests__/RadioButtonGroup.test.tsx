/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioButtonGroup, RadioButtonGroupProps } from '../RadioButtonGroup'
import { TooltipContextProvider } from '../../../frameworks/Tooltip/TooltipContext'
import { Color } from '@harness/design-system'

const TestRadioButtonGroupController = ({ options }: { options: RadioButtonGroupProps['options'] }) => {
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

  test('it should add the inline class when inline is passed', function () {
    const props: RadioButtonGroupProps = {
      label: 'Test Group',
      onChange: jest.fn(),
      options: [
        { label: 'option1', value: 'o1' },
        { label: 'option2', value: 'o2' }
      ]
    }

    const { rerender } = render(<RadioButtonGroup {...props} />)
    expect(screen.getByText('option1').parentElement).not.toHaveClass('inline')

    rerender(<RadioButtonGroup {...props} inline />)
    expect(screen.getByText('option1').parentElement).toHaveClass('inline')
  })

  test('it should render a string label', async () => {
    const label = 'TEST STRING'
    render(
      <RadioButtonGroup
        label={label}
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  test('it should render an element label', async () => {
    const testId = 'TEST ID'
    render(
      <RadioButtonGroup
        label={<span data-testid={testId}>Test label</span>}
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test('it should render a option label as an element', async () => {
    const testId = 'TEST ID'
    render(
      <RadioButtonGroup
        onChange={jest.fn()}
        options={[
          { label: <span data-testid={testId}>Test option</span>, value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test('it should use the passed name', async () => {
    const name = 'TEST NAME'
    render(
      <RadioButtonGroup
        name={name}
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    for (const el of screen.getAllByRole('radio')) {
      expect(el).toHaveAttribute('name', name)
    }
  })

  test('it should generate a name if one is not passed', async () => {
    render(
      <RadioButtonGroup
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    for (const el of screen.getAllByRole('radio')) {
      expect(el).toHaveAttribute('name', expect.stringMatching(/^RadioButtonGroup[0-9]+$/))
    }
  })

  test('it should call the onChange handler when the selection changes', async () => {
    const onChangeHandler = jest.fn()
    render(
      <RadioButtonGroup
        onChange={onChangeHandler}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    expect(onChangeHandler).not.toHaveBeenCalled()

    userEvent.click(screen.getByRole('radio', { name: 'option1' }))

    expect(onChangeHandler).toHaveBeenCalled()
  })

  test('it should disable all options when the group is disabled', async () => {
    const { rerender } = render(
      <RadioButtonGroup
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    for (const el of screen.getAllByRole('radio')) {
      expect(el).toBeEnabled()
    }

    rerender(
      <RadioButtonGroup
        disabled
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    for (const el of screen.getAllByRole('radio')) {
      expect(el).toBeDisabled()
    }
  })

  test('it should display tooltips for options with a tooltipId', async () => {
    const tooltipId = 'TOOLTIP ID'
    const tooltips = {
      [tooltipId]: 'TOOLTIP TEST'
    }
    render(
      <TooltipContextProvider initialTooltipDictionary={tooltips}>
        <RadioButtonGroup
          onChange={jest.fn()}
          options={[
            { label: 'option1', value: 'o1' },
            { label: 'option2', value: 'o2', tooltipId }
          ]}
        />
      </TooltipContextProvider>
    )

    expect(screen.queryByText(tooltips[tooltipId])).not.toBeInTheDocument()

    userEvent.hover(screen.getByRole('radio', { name: 'option2' })?.parentElement?.querySelector('svg') as SVGElement)

    await waitFor(() => {
      expect(screen.getByText(tooltips[tooltipId])).toBeInTheDocument()
    })
  })

  test('it should accept styled props', async () => {
    const testId = 'TEST ID'
    render(
      <RadioButtonGroup
        data-testid={testId}
        margin="large"
        background={Color.GREEN_50}
        onChange={jest.fn()}
        options={[
          { label: 'option1', value: 'o1' },
          { label: 'option2', value: 'o2' }
        ]}
      />
    )

    expect(screen.getByTestId(testId)).toHaveClass('margin-large')
    expect(screen.getByTestId(testId)).toHaveClass('background-green50')
  })
})
