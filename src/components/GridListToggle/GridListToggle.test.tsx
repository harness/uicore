import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'

import GridListToggle, { Views } from './GridListToggle'

const onViewToggle = jest.fn()

describe('GridListToggle test', () => {
  describe('When no props are passed', () => {
    test('By default Grid view should be selected', () => {
      const { container, getByTestId } = render(<GridListToggle />)
      const gridViewBtn = getByTestId('grid-view')
      expect(gridViewBtn.classList.contains('gridUnselected')).toBe(false)
      const listViewBtn = getByTestId('list-view')
      expect(listViewBtn.classList.contains('listUnselected')).toBe(true)
      expect(container).toMatchSnapshot()
    })
    test('when user switched to list view', async () => {
      const { getByTestId } = render(<GridListToggle />)
      const listViewBtn = getByTestId('list-view')
      act(() => {
        fireEvent.click(listViewBtn)
      })
      await waitFor(() => expect(onViewToggle).not.toBeCalled())
      expect(onViewToggle).toHaveBeenCalledTimes(0)
    })
  })

  describe('When props are passed - initialSelectedView: GRID', () => {
    test('By default Grid view should be selected', () => {
      const { container, getByTestId } = render(
        <GridListToggle initialSelectedView={Views.GRID} onViewToggle={onViewToggle} />
      )
      const gridViewBtn = getByTestId('grid-view')
      expect(gridViewBtn.classList.contains('gridUnselected')).toBe(false)
      const listViewBtn = getByTestId('list-view')
      expect(listViewBtn.classList.contains('listUnselected')).toBe(true)
      expect(container).toMatchSnapshot()
    })
    test('when user switchs to list view onViewToggle callback func should be called', async () => {
      const { getByTestId } = render(<GridListToggle initialSelectedView={Views.GRID} onViewToggle={onViewToggle} />)
      const listViewBtn = getByTestId('list-view')
      act(() => {
        fireEvent.click(listViewBtn)
      })
      await waitFor(() => expect(onViewToggle).toBeCalled())
      expect(onViewToggle).toHaveBeenCalledTimes(1)
      expect(onViewToggle).toHaveBeenCalledWith(Views.LIST)
    })
  })

  describe('When props are passed - initialSelectedView: LIST', () => {
    test('By default List view should be selected', () => {
      const { container, getByTestId } = render(
        <GridListToggle initialSelectedView={Views.LIST} onViewToggle={onViewToggle} />
      )
      const gridViewBtn = getByTestId('grid-view')
      expect(gridViewBtn.classList.contains('gridUnselected')).toBe(true)
      const listViewBtn = getByTestId('list-view')
      expect(listViewBtn.classList.contains('listUnselected')).toBe(false)
      expect(container).toMatchSnapshot()
    })
    test('when user switchs to Grid view onViewToggle callback func should be called', async () => {
      onViewToggle.mockReset()
      const { getByTestId } = render(<GridListToggle initialSelectedView={Views.LIST} onViewToggle={onViewToggle} />)
      const gridViewBtn = getByTestId('grid-view')
      act(() => {
        fireEvent.click(gridViewBtn)
      })
      await waitFor(() => expect(onViewToggle).toBeCalled())
      expect(onViewToggle).toHaveBeenCalledTimes(1)
      expect(onViewToggle).toHaveBeenCalledWith(Views.GRID)
    })
  })
})
