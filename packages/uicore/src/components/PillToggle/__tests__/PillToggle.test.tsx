/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { PillToggle } from '../PillToggle'
import { VisualYamlSelectedView } from 'components/VisualYamlToggle/VisualYamlToggle'
import userEvent from '@testing-library/user-event'

const options = [
  {
    label: 'VISUAL',
    value: VisualYamlSelectedView.VISUAL
  },
  {
    label: 'YAML',
    value: VisualYamlSelectedView.YAML
  }
]

describe('PillToggle', () => {
  test('snapshot testing on initial render', () => {
    const { container } = render(
      <PillToggle options={options as any} selectedView={VisualYamlSelectedView.VISUAL as any} onChange={jest.fn()} />
    )
    expect(container).toMatchSnapshot()
  })

  test('VISUAL should be selected', async () => {
    render(
      <PillToggle options={options as any} selectedView={VisualYamlSelectedView.VISUAL as any} onChange={jest.fn()} />
    )
    const visualDiv = screen.getByText('VISUAL')
    expect(visualDiv).toHaveClass('selected')
  })

  test('YAML should be selected', async () => {
    render(
      <PillToggle options={options as any} selectedView={VisualYamlSelectedView.YAML as any} onChange={jest.fn()} />
    )
    const yamlDiv = screen.getByText('YAML')
    expect(yamlDiv).toHaveClass('selected')
  })

  test('clicking on VISUAL should invoke onChange call', async () => {
    const onChange = jest.fn()
    render(
      <PillToggle options={options as any} selectedView={VisualYamlSelectedView.YAML as any} onChange={onChange} />
    )
    const visualDiv = screen.getByText('VISUAL')
    userEvent.click(visualDiv)
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(VisualYamlSelectedView.VISUAL)
  })

  test('clicking on VISUAL should not invoke onChange call when toggle should be disabled', async () => {
    const onChange = jest.fn()
    render(
      <PillToggle
        options={options as any}
        selectedView={VisualYamlSelectedView.YAML as any}
        onChange={onChange}
        disableToggle={true}
      />
    )
    const visualDiv = screen.getByText('VISUAL')
    userEvent.click(visualDiv)
    expect(onChange).not.toHaveBeenCalled()
  })

  test('should show disable reason icon when showDisableToggleReason is true', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <PillToggle
        options={options as any}
        selectedView={VisualYamlSelectedView.YAML as any}
        onChange={onChange}
        disableToggle={true}
        showDisableToggleReason={true}
      />
    )
    expect(container).toMatchSnapshot()
    const visualDiv = screen.getByText('VISUAL')
    userEvent.click(visualDiv)
    expect(onChange).not.toHaveBeenCalled()
  })
})
