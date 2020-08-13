import React from 'react'
import { render } from '@testing-library/react'
import Pagination from '../Pagination'

const noop = () => {
  // empty function
}

describe('Pagination', () => {
  test('itemCount < pageSize', () => {
    const { container } = render(
      <Pagination pageSize={10} pageIndex={0} pageCount={1} itemCount={5} gotoPage={noop} nextPage={noop} />
    )
    expect(container).toMatchSnapshot()
  })

  test('pageCount < 8', () => {
    const { container } = render(
      <Pagination pageSize={10} pageIndex={0} pageCount={3} itemCount={30} gotoPage={noop} nextPage={noop} />
    )
    expect(container).toMatchSnapshot()
  })

  test('pageCount >= 8', () => {
    const { container } = render(
      <Pagination pageSize={10} pageIndex={0} pageCount={10} itemCount={100} gotoPage={noop} nextPage={noop} />
    )
    expect(container).toMatchSnapshot()
  })
})
