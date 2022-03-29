/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'

import { render, fireEvent } from '@testing-library/react'

import { useModalHook } from '../useModalHook'

describe('simple usage', () => {
  function App() {
    const [showModal, hideModal] = useModalHook(() => (
      <div>
        <p>Modal content</p>
        <button onClick={hideModal}>Hide modal</button>
      </div>
    ))

    return <button onClick={showModal}>Show modal</button>
  }

  test('should show the modal', async () => {
    const { findByText, queryByText } = render(<App />)

    const showModal = await findByText('Show modal')
    fireEvent.click(showModal)

    expect(queryByText('Modal content')).toBeTruthy()
  })

  test('should hide the modal', () => {
    const { getByText, queryByText } = render(<App />)

    fireEvent.click(getByText('Show modal'))

    fireEvent.click(getByText('Hide modal'))

    expect(queryByText('Modal content')).not.toBeTruthy()
  })

  test('should hide the modal when parent component unmounts', () => {
    const { getByText, queryByText, rerender } = render(
      <div>
        <App />
      </div>
    )

    fireEvent.click(getByText('Show modal'))

    rerender(<div />)

    expect(queryByText('Modal content')).not.toBeTruthy()
  })
})

describe('updating modal', () => {
  test('should work with internal state', () => {
    const App = () => {
      const [showModal] = useModalHook(() => {
        const [count, setCount] = useState(0)

        return (
          <div>
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        )
      })

      return <button onClick={showModal}>Show modal</button>
    }

    const { getByText, queryByText } = render(<App />)

    fireEvent.click(getByText('Show modal'))

    expect(queryByText('The count is 0')).toBeTruthy()

    fireEvent.click(getByText('Increment'))

    expect(queryByText('The count is 1')).toBeTruthy()
  })

  test('should work with external state', () => {
    const App = () => {
      const [count, setCount] = useState(0)
      const [showModal] = useModalHook(
        () => (
          <div>
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        ),
        [count]
      )

      return <button onClick={showModal}>Show modal</button>
    }

    const { getByText, queryByText } = render(<App />)

    fireEvent.click(getByText('Show modal'))

    expect(queryByText('The count is 0')).toBeTruthy()

    fireEvent.click(getByText('Increment'))

    expect(queryByText('The count is 1')).toBeTruthy()
  })

  test('should not rerender when external state changes', () => {
    const mountCounter = jest.fn()

    class MountSpy extends React.Component {
      componentDidMount() {
        mountCounter()
      }

      render() {
        return null
      }
    }

    const App = () => {
      const [count, setCount] = useState(0)
      const [showModal] = useModalHook(
        () => (
          <div>
            <MountSpy />
            <span>The count is {count}</span>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        ),
        [count]
      )

      return <button onClick={showModal}>Show modal</button>
    }

    const { getByText } = render(<App />)

    fireEvent.click(getByText('Show modal'))

    fireEvent.click(getByText('Increment'))

    expect(mountCounter).toHaveBeenCalledTimes(1)
  })
})

describe('multiple modals', () => {
  test('should show multiple modals at the same time', () => {
    const App = () => {
      const [showFirstModal] = useModalHook(() => <div>First modal content</div>)
      const [showSecondModal] = useModalHook(() => <div>Second modal content</div>)

      return (
        <div>
          <button onClick={showFirstModal}>Show first modal</button>
          <button onClick={showSecondModal}>Show second modal</button>
        </div>
      )
    }

    const { getByText, queryByText } = render(<App />)

    fireEvent.click(getByText('Show first modal'))
    fireEvent.click(getByText('Show second modal'))

    expect(queryByText('First modal content')).toBeTruthy()
    expect(queryByText('Second modal content')).toBeTruthy()
  })
})
