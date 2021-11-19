import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CollapsableSelectOptions, CollapsableSelectType, FormikCollapsableSelect } from './CollapsableSelect'
import { Form, Formik } from 'formik'
import { noop } from 'lodash-es'
import * as Yup from 'yup'
import { Icon } from '../../icons/Icon'
import { Layout } from '../..'

export default {
  title: 'Components / CollapsableSelect',

  component: FormikCollapsableSelect,
  parameters: {
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
                <code>{`import { FormikCollapsableSelect } from '@wings-software/uicore'`}</code>
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
              return item.icon
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
      icon: <Icon name="service-jenkins" />,

      value: 'Jenkins'
    },
    {
      icon: <Icon name="service-gcp" />,
      value: 'Gcp'
    }
  ]
}
