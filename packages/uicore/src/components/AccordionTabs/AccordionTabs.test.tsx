/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccordionTabs, TabListProps } from './AccordionTabs'

describe('AccordionTabs', () => {
  const tabList: TabListProps[] = [
    {
      id: 'panel-1',
      title: 'Tab 1',
      panel: <div>Tab 1 Content</div>
    },
    {
      id: 'panel-2',
      title: 'Tab 2',
      panel: <span>Tab 2 Content</span>
    }
  ]

  const tabsProps = {
    id: 'tabs',
    selectedTabId: 'panel-1',
    onChange: jest.fn()
  }

  const accordionProps = {
    onChange: jest.fn(),
    controlledActiveId: 'panel-1'
  }

  it('renders the tab titles and panels correctly', () => {
    render(<AccordionTabs tabList={tabList} tabsProps={tabsProps} accordionProps={accordionProps} />)

    // Assert that the tab titles are rendered
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()

    // Assert that the first tab panel is rendered and the second one is not
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument()
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument()
  })

  it('switches between tabs when clicked', () => {
    const { getByTestId } = render(
      <AccordionTabs tabList={tabList} tabsProps={tabsProps} accordionProps={accordionProps} />
    )

    // Assert that the first tab is initially selected
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()

    // Click the second tab
    userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    // Assert that onChangeMock was called with the correct tab id
    expect(tabsProps.onChange.mock.calls[0][0]).toEqual('panel-2')

    // Assert that the second tab is now selected
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()

    expect(getByTestId('panel-1-details')).toBeDefined()
    expect(() => getByTestId('panel-2-details')).toThrow()

    expect(getByTestId('panel-1-panel').dataset.open).toBe('true')
    expect(getByTestId('panel-2-panel').dataset.open).toBe('false')
    fireEvent.click(getByTestId('panel-2-summary'))
    expect(accordionProps.onChange).toHaveBeenCalledWith('panel-2')
  })
})
