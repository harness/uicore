/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CollapsableSelectOptions, CollapsableSelectType, FormikCollapsableSelect } from './CollapsableSelect'
import { Form, Formik } from 'formik'
import { noop } from 'lodash-es'
import * as Yup from 'yup'
import { Icon } from '@harness/icons'
import { Layout, Text } from '../..'

export default {
  title: 'Components / CollapsableSelect',

  component: FormikCollapsableSelect,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FormikCollapsableSelect</Title>
            <Subtitle>
              <pre>
                <code>{`import { FormikCollapsableSelect } from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta

interface T {
  text: string
}

interface U {
  info: string
  icon: JSX.Element
}

export const CardView: Story<{ items: Array<CollapsableSelectOptions & T> }> = args => {
  return (
    <Formik
      initialValues={{ connectivityMode: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        connectivityMode: Yup.string().trim().required('Connectivity Mode  is required')
      })}>
      {formik => (
        <Form>
          <FormikCollapsableSelect<T>
            type={CollapsableSelectType.CardView}
            {...args}
            name={'connectivityMode'}
            selected={args.items[args.items.findIndex(item => item.value === formik.values.connectivityMode)]}
            renderItem={item => {
              return <Layout.Vertical>{item.text}</Layout.Vertical>
            }}
          />
        </Form>
      )}
    </Formik>
  )
}

export const Custom: Story<{ items: Array<CollapsableSelectOptions & U>; isReadonly: boolean }> = args => {
  return (
    <Formik
      initialValues={{ connectivityMode: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        connectivityMode: Yup.string().trim().required('Connectivity Mode  is required')
      })}>
      {formik => (
        <Form>
          <FormikCollapsableSelect<U>
            {...args}
            selected={args.items[args.items.findIndex(item => item.value === formik.values.connectivityMode)]}
            name={'connectivityMode'}
            renderItem={item => {
              return (
                <Layout.Vertical border={true} spacing="medium">
                  {item.icon}
                  <Text font="small">{item.info}</Text>
                </Layout.Vertical>
              )
            }}
          />
        </Form>
      )}
    </Formik>
  )
}

CardView.args = {
  items: [
    {
      text: 'This option is to select connectivity through Delegate',
      value: 'Delegate'
    },
    {
      text: 'This option is to select connectivity through Manager',
      value: 'Manager'
    }
  ]
}

Custom.args = {
  items: [
    {
      icon: <Icon name="service-jenkins" size={50} />,
      info: 'This option selects Jenkins',
      value: 'Jenkins'
    },
    {
      icon: <Icon name="service-gcp" size={50} />,
      info: 'This option selects Gcp',
      value: 'Gcp'
    }
  ]
}
