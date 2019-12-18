import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'

import { FieldArray } from './FieldArray'

const fields = [
  {
    name: 'col1',
    label: 'Column Header 1',
    defaultValue: 'Item 1'
  },
  {
    name: 'col2',
    label: 'Column Header 2',
    defaultValue: 'Item 2'
  }
]
const noDataText = 'This is a no data/add data message.'

describe('<FieldArray /> tests', () => {
  test('render no data card on init', () => {
    const { container } = render(<FieldArray fields={fields} title="Field List" noDataText={noDataText} />)
    const noDataTextEl = container.querySelector('.noData .text')

    expect(container).toMatchSnapshot()
    expect(noDataTextEl).not.toBeNull()
    expect(noDataTextEl!.innerHTML).toEqual(noDataText)
  })

  test('render empty card on init', () => {
    const { container } = render(<FieldArray fields={fields} title="Field List" />)

    expect(container).toMatchSnapshot()
  })

  test('should be able to add rows from both buttons', async () => {
    const { container } = render(<FieldArray fields={fields} title="Field List" noDataText={noDataText} />)
    const btnAddRow = container.querySelector('.noData button[data-id="btn-add-no-data"]')
    fireEvent.click(btnAddRow!)
    await wait()
    expect(container).toMatchSnapshot()
    const btnAddRow2 = container.querySelector('.title button[data-id="btn-add"]')
    fireEvent.click(btnAddRow2!)
    await wait()
    expect(container).toMatchSnapshot()
  })

  test('should be able to delete row', async () => {
    const { container } = render(<FieldArray fields={fields} title="Field List" noDataText={noDataText} />)
    const btnAddRow = container.querySelector('button[data-id="btn-add-no-data"]')
    fireEvent.click(btnAddRow!)
    await wait()
    const btnDeleteRow = container.querySelector('tbody tr button[data-id="btn-delete"]')
    fireEvent.click(btnDeleteRow!)
    await wait()
    expect(container).toMatchSnapshot()
  })

  test('should be able to render custom fields', async () => {
    const customField = {
      name: 'col3',
      label: 'Column Header 3',
      defaultValue: 'Item 3',
      renderer: value => <div id="#customField">{value}</div>
    }
    const { container } = render(
      <FieldArray fields={fields.concat(customField)} title="Field List" noDataText={noDataText} />
    )
    const btnAddRow = container.querySelector('button[data-id="btn-add-no-data"]')
    fireEvent.click(btnAddRow!)
    await wait()
    expect(container).toMatchSnapshot()
  })
})
