/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Tabs, Tab } from './Tabs'

describe('Tabs component', () => {
  test('renders tabs with children', () => {
    const { container } = render(
      <Tabs id="test-tabs">
        <Tab id="tab1" title="Tab 1" panel={<div>Panel 1</div>} />
        <Tab id="tab2" title="Tab 2" panel={<div>Panel 2</div>} />
      </Tabs>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders tabs with tabList prop', () => {
    const tabList = [
      { id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div> },
      { id: 'tab2', title: 'Tab 2', panel: <div>Panel 2</div> }
    ]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} />)
    expect(container).toMatchSnapshot()
  })

  test('renders tabs with icons', () => {
    const tabList = [
      { id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div>, iconProps: { name: 'main-dashboard' } },
      { id: 'tab2', title: 'Tab 2', panel: <div>Panel 2</div>, iconProps: { name: 'settings' } }
    ]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} />)
    expect(container).toMatchSnapshot()
  })

  test('renders vertical tabs', () => {
    const tabList = [
      { id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div> },
      { id: 'tab2', title: 'Tab 2', panel: <div>Panel 2</div> }
    ]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} vertical />)
    expect(container).toMatchSnapshot()
  })

  test('hides tabs with hidden prop', () => {
    const tabList = [
      { id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div> },
      { id: 'tab2', title: 'Tab 2', panel: <div>Panel 2</div>, hidden: true },
      { id: 'tab3', title: 'Tab 3', panel: <div>Panel 3</div> }
    ]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} />)
    expect(container.querySelector('#tab2')).toBeNull()
  })

  test('renders all tab panels when renderAllTabPanels is true', () => {
    const tabList = [
      { id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div> },
      { id: 'tab2', title: 'Tab 2', panel: <div>Panel 2</div> }
    ]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} renderAllTabPanels />)
    expect(container).toMatchSnapshot()
  })

  test('applies custom className', () => {
    const tabList = [{ id: 'tab1', title: 'Tab 1', panel: <div>Panel 1</div> }]
    const { container } = render(<Tabs id="test-tabs" tabList={tabList} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })
})
