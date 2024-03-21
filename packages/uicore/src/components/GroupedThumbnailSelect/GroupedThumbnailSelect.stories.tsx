/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
                <code>{`import {GroupedThumbnailSelect} from '@harness/uicore'`}</code>
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
          icon: 'advanced',
          value: 'KubernetesDirect'
        }
      ]
    },
    {
      groupLabel: 'Via Cloud Provider',
      items: [
        {
          label: 'Google Kubernetes Engine',
          icon: 'advanced',
          value: 'KubernetesGcp'
        },
        {
          label: 'Elastic Kubernetes Engine',
          icon: 'advanced',
          value: 'KubernetesElastic'
        }
      ]
    }
  ],
  isReadonly: false
}
