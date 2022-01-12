import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Intent, StepsProgress } from '../..'
import { StepsProgressProps } from '../StepsProgress/StepsProgress'
import { omit } from 'lodash-es'

export default {
  title: 'Components / StepsProgress',

  component: StepsProgress,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>StepsProgress</Title>
            <Subtitle>
              <pre>
                <code>{`import {StepsProgress} from '@harness/uicore'`}</code>
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
export const Basic: Story<StepsProgressProps> = args => {
  const {
    steps = [
      'Checking Delegate',
      'Establising Connection with the Delegate and Kubernetes',
      'Checking for heartbeat',
      'Verifying Connection'
    ],
    intent = Intent.SUCCESS,
    current = 1,
    currentStatus = 'PROCESS'
  } = args
  const argsCopy = omit(args, ['steps', 'intent', 'current', 'currentStatus'])
  return <StepsProgress steps={steps} intent={intent} current={current} currentStatus={currentStatus} {...argsCopy} />
}
export const Example1: Story<StepsProgressProps> = args => {
  const {
    steps = [
      'Checking Delegate',
      'Establising Connection with the Delegate and Kubernetes',
      'Checking for heartbeat',
      'Verifying Connection'
    ],
    intent = Intent.DANGER,
    current = 3,
    currentStatus = 'ERROR'
  } = args
  const argsCopy = omit(args, ['steps', 'intent', 'current', 'currentStatus'])
  return <StepsProgress steps={steps} intent={intent} current={current} currentStatus={currentStatus} {...argsCopy} />
}
export const Example2: Story<StepsProgressProps> = args => {
  const {
    steps = [
      'Checking Delegate',
      'Establising Connection with the Delegate and Kubernetes',
      'Checking for heartbeat',
      'Verifying Connection'
    ],
    intent = Intent.SUCCESS,
    current = 4,
    currentStatus = 'DONE'
  } = args
  const argsCopy = omit(args, ['steps', 'intent', 'current', 'currentStatus'])
  return <StepsProgress steps={steps} intent={intent} current={current} currentStatus={currentStatus} {...argsCopy} />
}
