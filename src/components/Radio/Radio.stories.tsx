import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Radio } from '../..'
import { RadioProps } from '../Radio/Radio'

export default {
  title: 'Components / Radio',

  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Radio</Title>
            <Subtitle>
              <pre>
                <code>{`import {Radio} from '@harness/uicore'`}</code>
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
export const Basic: Story<RadioProps> = args => {
  return <Radio label="Item 1" value="one" {...args} />
}
