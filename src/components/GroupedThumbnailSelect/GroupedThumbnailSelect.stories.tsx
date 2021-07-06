import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import GroupedThumbnailSelect, { GroupedThumbnailSelectProps } from './GroupedThumbnailSelect'
import { Formik } from 'formik'
import { noop } from 'lodash-es'
import * as Yup from 'yup'

export default {
  title: 'Components / GroupedThumbnailSelect',

  component: GroupedThumbnailSelect,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>GroupedThumbnailSelect</Title>
            <Subtitle>
              <pre>
                <code>{`import {GroupedThumbnailSelect} from '@wings-software/uicore'`}</code>
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

export const Basic: Story<GroupedThumbnailSelectProps> = args => {
  return (
    <Formik
      initialValues={{ infrastructureType: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        infrastructureType: Yup.string().trim().required('Infrastructure type is required')
      })}>
      <GroupedThumbnailSelect {...args} name={'infrastructureType'} />
    </Formik>
  )
}

Basic.args = {
  groups: [
    {
      groupLabel: 'Direct Connection',
      items: [
        {
          label: 'Kubernetes',
          icon: 'service-kubernetes',
          value: 'KubernetesDirect'
        }
      ]
    },
    {
      groupLabel: 'Via Cloud Provider',
      items: [
        {
          label: 'Google Kubernetes Engine',
          icon: 'google-kubernetes-engine',
          value: 'KubernetesGcp'
        },
        {
          label: 'Elastic Kubernetes Engine',
          icon: 'elastic-kubernetes-service',
          value: 'KubernetesElastic'
        }
      ]
    }
  ],
  isReadonly: false
}
