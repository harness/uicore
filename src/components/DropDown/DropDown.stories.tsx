import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DropDown, DropDownProps } from './DropDown'
import { SelectOption } from '../Select/Select'
import { Layout } from '../../layouts/Layout'

export default {
  title: 'Components / DropDown',

  component: DropDown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>DropDown</Title>
            <Subtitle>
              <pre>
                <code>{`import {DropDown} from '@wings-software/uicore'`}</code>
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

export const Basic: Story<DropDownProps> = args => {
  const [item, setItem] = useState<SelectOption | null>(null)
  return (
    <Layout.Horizontal flex>
      <DropDown {...args} value={item} onChange={setItem} />
    </Layout.Horizontal>
  )
}

Basic.args = {
  placeholder: 'Status',
  items: [
    { label: 'Aborted', value: 'aborted' },
    { label: 'Expired', value: 'expired' },
    { label: 'Failed', value: 'failed' },
    { label: 'Running', value: 'running' },
    { label: 'Success', value: 'success' },
    { label: 'Approval Rejected', value: 'approval-rejected' },
    { label: 'Paused', value: 'paused' },
    { label: 'Waiting on approval', value: 'waiting-on-approval' },
    { label: 'Waiting on intervention', value: 'waiting-on-intervention' },
    { label: 'Waiting on resources', value: 'waiting-on-resources' }
  ]
}
