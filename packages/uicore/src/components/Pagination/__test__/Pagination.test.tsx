/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, RenderResult, waitFor, screen } from '@testing-library/react'
import Pagination, { PaginationProps } from '../Pagination'

const setWindowWidth = (width: number): void => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  })

  window.dispatchEvent(new Event('resize'))
}

const renderComponent = (props: Partial<PaginationProps> = {}): RenderResult =>
  render(<Pagination pageIndex={0} pageSize={10} pageCount={30} itemCount={300} gotoPage={jest.fn} {...props} />)

describe('Pagination', () => {
  test('itemCount < pageSize', () => {
    const { container } = renderComponent({ pageCount: 1, itemCount: 5 })
    expect(container).toMatchSnapshot()
  })

  test('pageCount < 8', () => {
    const { container } = renderComponent({ pageCount: 3, itemCount: 30 })
    expect(container).toMatchSnapshot()
  })

  test('pageCount >= 8', () => {
    const { container } = renderComponent({ pageCount: 10, itemCount: 100 })
    expect(container).toMatchSnapshot()
  })

  test('it should display the buttons when the browser width is at the passed break point', async () => {
    const breakPoint = 1024
    setWindowWidth(breakPoint)
    renderComponent({ breakAt: breakPoint })

    await waitFor(() => expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument())
  })

  test('it should not display the buttons when the browser width is below the passed break point', async () => {
    setWindowWidth(960)
    renderComponent({ breakAt: 1024 })

    await waitFor(() => expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument())
  })

  test('it should show/hide the buttons as the window resizes', async () => {
    const breakPoint = 1024
    setWindowWidth(breakPoint + 200)
    renderComponent({ breakAt: breakPoint })

    await waitFor(() => expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument())

    setWindowWidth(breakPoint - 200)
    await waitFor(() => expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument())

    setWindowWidth(breakPoint)
    await waitFor(() => expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument())
  })
})
