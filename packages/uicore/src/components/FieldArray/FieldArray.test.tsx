/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { Formik } from 'formik'

import FieldArray, { Field } from './FieldArray'

const fields: Field[] = [
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
const data = [
  {
    col1: 'col 1',
    col2: 'col 2'
  },
  {
    col1: 'col 1',
    col2: 'col 2'
  }
]

const noDataText = 'This is a no data/add data message.'

describe('<FieldArray /> tests', () => {
  test('render placeholder when no initial value given', () => {
    const { container } = render(
      <Formik onSubmit={jest.fn()} initialValues={{}}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray name="fieldArray" fields={fields} label="Field List" placeholder={noDataText} />
          </form>
        )}
      </Formik>
    )
    const noDataTextEl = container.querySelector('.noData .text')

    expect(container).toMatchSnapshot()
    expect(noDataTextEl).not.toBeNull()
    expect(noDataTextEl!.innerHTML).toEqual(noDataText)
  })

  test('render initial value when given', () => {
    const { container } = render(
      <Formik onSubmit={jest.fn()} initialValues={{ fieldArray: data }}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray name="fieldArray" fields={fields} label="Field List" placeholder={noDataText} />
          </form>
        )}
      </Formik>
    )
    expect(container).toMatchSnapshot()
    expect(container.querySelectorAll('tr').length).toEqual(data.length + 1)
  })

  test('should be able to add rows from both buttons', async () => {
    const { container } = render(
      <Formik onSubmit={jest.fn()} initialValues={{}}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray name="fieldArray" fields={fields} label="Field List" placeholder={noDataText} />
          </form>
        )}
      </Formik>
    )
    const btnAddRow = container.querySelector('.noData button[data-id="btn-add-no-data"]')
    fireEvent.click(btnAddRow!)
    await wait()
    expect(container).toMatchSnapshot()
    expect(container.querySelectorAll('tr').length).toEqual(2)
    const btnAddRow2 = container.querySelector('.title button[data-id="btn-add"]')
    fireEvent.click(btnAddRow2!)
    await wait()
    expect(container).toMatchSnapshot()
    expect(container.querySelectorAll('tr').length).toEqual(3)
  })

  test('should be able to delete row', async () => {
    const { container } = render(
      <Formik onSubmit={jest.fn()} initialValues={{ fieldArray: data }}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray name="fieldArray" fields={fields} label="Field List" placeholder={noDataText} />
          </form>
        )}
      </Formik>
    )

    expect(container.querySelectorAll('tr').length).toEqual(3)
    const btnDeleteRow = container.querySelector('tbody tr button[data-id="btn-delete"]')
    fireEvent.click(btnDeleteRow!)
    await wait()
    expect(container).toMatchSnapshot()
    expect(container.querySelectorAll('tr').length).toEqual(2)
  })

  test('should be able to render custom fields', async () => {
    const customField: Field = {
      name: 'col3',
      label: 'Column Header 3',
      defaultValue: 'Item 3',
      // eslint-disable-next-line react/display-name
      renderer: value => <div id="#customField">{value}</div>
    }
    const { container } = render(
      <Formik onSubmit={jest.fn()} initialValues={{ fieldArray: data }}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray
              name="fieldArray"
              fields={fields.concat(customField)}
              label="Field List"
              placeholder={noDataText}
            />
          </form>
        )}
      </Formik>
    )

    expect(container).toMatchSnapshot()
    expect(container.querySelector('#customField')).not.toBeUndefined()
  })
})
