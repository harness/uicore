/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import ThumbnailSelect, { Item } from './ThumbnailSelect'
import { Formik } from 'formik'
import { noop } from 'lodash-es'
import * as Yup from 'yup'

export default {
  title: 'Components / ThumbnailSelect',

  component: ThumbnailSelect,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>ThumbnailSelect</Title>
            <Subtitle>
              <pre>
                <code>{`import {ThumbnailSelect} from '@harness/uicore'`}</code>
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

export const Basic: Story<{ items: Item[]; isReadonly: boolean }> = args => {
  return (
    <Formik
      initialValues={{ deploymentType: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        deploymentType: Yup.string().trim().required('Deployment type is required')
      })}>
      <ThumbnailSelect {...args} name={'deploymentType'} />
    </Formik>
  )
}

export const Large: Story<{ items: Item[]; isReadonly: boolean }> = args => {
  return (
    <Formik
      initialValues={{ deploymentType: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        deploymentType: Yup.string().trim().required('Deployment type is required')
      })}>
      <ThumbnailSelect size="large" {...args} name={'deploymentType'} />
    </Formik>
  )
}

export const Static: Story<{ items: Item[]; isReadonly: boolean }> = args => {
  return (
    <Formik
      initialValues={{ deploymentType: '' }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        deploymentType: Yup.string().trim().required('Deployment type is required')
      })}>
      <ThumbnailSelect {...args} name={'deploymentType'} staticItems />
    </Formik>
  )
}

Basic.args = {
  items: [
    {
      label: 'Kubernetes',
      icon: 'advanced',
      value: 'kubernetes'
    },
    {
      label: 'Amazon ECS',
      icon: 'advanced',
      value: 'amazonEcs'
    },
    {
      label: 'AWS AMI',
      icon: 'advanced',
      value: 'amazonAmi'
    },
    {
      label: 'CodeDeploy',
      icon: 'advanced',
      value: 'awsCodeDeploy'
    },
    {
      label: 'WinRM',
      icon: 'command-winrm',
      value: 'winrm'
    },
    {
      label: 'AWS Lambda',
      icon: 'advanced',
      disabled: true,
      value: 'awsLambda'
    },
    {
      label: 'PCF',
      icon: 'advanced',
      disabled: true,
      value: 'pcf'
    },
    {
      label: 'Secure Shell',
      icon: 'secret-ssh',
      disabled: true,
      value: 'ssh'
    }
  ],
  isReadonly: false
}

Large.args = {
  items: [
    {
      label: 'Kubernetes',
      value: 'kubernetes'
    },
    {
      label: 'Amazon ECS',
      value: 'amazonEcs'
    },
    {
      label: 'AWS AMI',
      value: 'amazonAmi'
    },
    {
      label: 'CodeDeploy',
      value: 'awsCodeDeploy'
    },
    {
      label: 'WinRM',
      value: 'winrm'
    },
    {
      label: 'AWS Lambda',
      disabled: true,
      value: 'awsLambda'
    },
    {
      label: 'PCF',
      disabled: true,
      value: 'pcf'
    },
    {
      label: 'Secure Shell',
      disabled: true,
      value: 'ssh'
    }
  ],
  isReadonly: false
}

Static.args = {
  items: [
    {
      label: 'Kubernetes',
      icon: 'advanced',
      value: 'kubernetes'
    },
    {
      label: 'Amazon ECS',
      icon: 'advanced',
      value: 'amazonEcs'
    },
    {
      label: 'AWS AMI',
      icon: 'advanced',
      value: 'amazonAmi'
    },
    {
      label: 'CodeDeploy',
      icon: 'advanced',
      value: 'awsCodeDeploy'
    },
    {
      label: 'WinRM',
      icon: 'command-winrm',
      value: 'winrm'
    },
    {
      label: 'AWS Lambda',
      icon: 'advanced',
      disabled: true,
      value: 'awsLambda'
    },
    {
      label: 'PCF',
      icon: 'advanced',
      disabled: true,
      value: 'pcf'
    },
    {
      label: 'Secure Shell',
      icon: 'secret-ssh',
      disabled: true,
      value: 'ssh'
    }
  ],
  isReadonly: false
}
