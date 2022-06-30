/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { CollapsableSelectType, FormikCollapsableSelect } from './CollapsableSelect'
import { Form, Formik } from 'formik'
import { Layout } from 'index'
import { noop } from 'lodash'

const items = [
  {
    text: 'Kubernetes',
    value: 'service-kubernetes',
    icon: 'service-kubernetes'
  },
  {
    text: 'Github',
    value: 'service-github',
    icon: 'service-github'
  }
]

describe('Test render CollapsableSelect', () => {
  test('should render card view with defaultValue', () => {
    const { container, getByText } = render(
      <Formik initialValues={{ connectivityMode: 'service-kubernetes' }} onSubmit={jest.fn()}>
        {formik => (
          <Form>
            <FormikCollapsableSelect
              type={CollapsableSelectType.CardView}
              items={items}
              name={'connectivityMode'}
              selected={items[items.findIndex(item => item.value === formik.values.connectivityMode)]}
              renderItem={item => {
                return <Layout.Vertical>{item.text}</Layout.Vertical>
              }}
            />
          </Form>
        )}
      </Formik>
    )
    expect(getByText('Change')).toBeInTheDocument()
    expect(container.querySelector('[data-icon="main-tick"]')).not.toBeNull()

    expect(container).toMatchSnapshot()
  })

  test('should render card view with no defaultValue', () => {
    const { container, getByText } = render(
      <Formik initialValues={{ connectivityMode: '' }} onSubmit={noop}>
        {formik => (
          <Form>
            <FormikCollapsableSelect
              type={CollapsableSelectType.CardView}
              items={items}
              name={'connectivityMode'}
              selected={undefined}
              onChange={() => {
                formik.setFieldTouched('connectivityMode', true, false)
              }}
              renderItem={item => {
                return <Layout.Vertical>{item?.text}</Layout.Vertical>
              }}
            />
          </Form>
        )}
      </Formik>
    )
    // displays other options as well
    expect(getByText('Github')).toBeInTheDocument()
    // nothing selected
    expect(container.querySelector('[data-icon="main-tick"]')).toBeNull()
    expect(container).toMatchSnapshot()
  })

  test('collapsable select flow ', () => {
    const { container, getByText } = render(
      <Formik initialValues={{ connectivityMode: 'service-kubernetes' }} onSubmit={noop}>
        {formik => (
          <Form>
            <FormikCollapsableSelect
              type={CollapsableSelectType.CardView}
              items={items}
              name={'connectivityMode'}
              selected={items[items.findIndex(item => item.value === formik.values.connectivityMode)]}
              renderItem={item => {
                return <Layout.Vertical>{item?.text}</Layout.Vertical>
              }}
            />
          </Form>
        )}
      </Formik>
    )
    expect(container.querySelector('[data-icon="main-tick"]')).not.toBeNull()

    act(() => {
      fireEvent.click(getByText('Change'))
    })
    // Close and other options appear
    expect(getByText('Github')).toBeInTheDocument()
    expect(getByText('Close')).toBeInTheDocument()

    const secondOption = container.querySelector('[data-index="1"]')

    act(() => {
      if (secondOption) fireEvent.click(secondOption)
    })

    expect(getByText('Change')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('should render customView ', () => {
    const { container } = render(
      <Formik initialValues={{ connectivityMode: 'service-kubernetes' }} onSubmit={noop}>
        {formik => (
          <Form>
            <FormikCollapsableSelect
              items={items}
              name={'connectivityMode'}
              selected={items[items.findIndex(item => item.value === formik.values.connectivityMode)]}
              renderItem={item => {
                return <Layout.Vertical>{item?.text}</Layout.Vertical>
              }}
            />
          </Form>
        )}
      </Formik>
    )
    // View will not have card  and will be controlled by user
    expect(container.querySelector('[class="bp3-card bp3-interactive bp3-elevation-0 card interactive"]')).toBeNull()

    expect(container).toMatchSnapshot()
  })
})
