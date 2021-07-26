import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DropDown, DropDownProps } from './DropDown'
import { SelectOption } from '../Select/Select'

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
    <>
      <DropDown {...args} value={item} onChange={setItem} />
    </>
  )
}

Basic.args = {
  items: [
    { label: 'Kubernetes', value: 'service-kubernetes' },
    { label: 'GitHub', value: 'service-github' },
    { label: 'ELK', value: 'service-elk' },
    { label: 'Jenkins', value: 'service-jenkins' },
    { label: 'GCP', value: 'service-gcp' }
  ]
}
