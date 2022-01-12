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

Basic.args = {
  items: [
    {
      label: 'Kubernetes',
      icon: 'service-kubernetes',
      value: 'kubernetes'
    },
    {
      label: 'Amazon ECS',
      icon: 'service-ecs',
      value: 'amazonEcs'
    },
    {
      label: 'AWS AMI',
      icon: 'main-service-ami',
      value: 'amazonAmi'
    },
    {
      label: 'CodeDeploy',
      icon: 'app-aws-code-deploy',
      value: 'awsCodeDeploy'
    },
    {
      label: 'WinRM',
      icon: 'command-winrm',
      value: 'winrm'
    },
    {
      label: 'AWS Lambda',
      icon: 'app-aws-lambda',
      disabled: true,
      value: 'awsLambda'
    },
    {
      label: 'PCF',
      icon: 'service-pivotal',
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
