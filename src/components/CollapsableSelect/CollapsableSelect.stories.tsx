import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CollapsableSelectOptions, CollapsableSelectType, FormikCollapsableSelect } from './CollapsableSelect'
import { Formik } from 'formik'
import { noop } from 'lodash-es'
import * as Yup from 'yup'
import { Icon, Layout } from 'index'

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

export const CardView: Story<{ items: Array<CollapsableSelectOptions & T>; }> = args => {
  return (
    <Formik
      initialValues={{ connectivityMode: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        connectivityMode: Yup.string().trim().required('Connectivity Mode  is required')
      })}>
      <FormikCollapsableSelect<T> type={CollapsableSelectType.CardView} {...args} name={'connectivityMode'} renderItem={(item)=>{
          <Layout.Vertical>{item.text}</Layout.Vertical>
      }} />
    </Formik>
  )
}

export const Custom: Story<{ items:  Array<CollapsableSelectOptions & U>; isReadonly: boolean }> = args => {
  return (
    <Formik
    initialValues={{ connectivityMode: '' }}
    onSubmit={noop}
    validationSchema={Yup.object().shape({
      connectivityMode: Yup.string().trim().required('Connectivity Mode  is required')
    })}>
      <FormikCollapsableSelect<U>  {...args} name={'connectivityMode'}  renderItem={(item)=>{
          item.icon            
      }}/>
    </Formik>
  )
}

CardView.args = {
    items: [
      {
        text : 'This option is to select connectivity through Delegate',
        value: 'Delegate'
      },
      {
        text : 'This option is to select connectivity through Manager',
        value: 'Manager'
      }]
    }

 Custom.args = {
        items: [
          {
            icon: <Icon  name='service-jenkins' />,
      
            value: 'Jenkins'
          },
          {
            icon: <Icon  name='service-gcp' />,
            value: 'Gcp'
          }]
         }  