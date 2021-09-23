import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Switch } from '../..'
import { SwitchProps } from '../Switch/Switch'

export default {
  title: 'Components / Switch',

  component: Switch,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Switch</Title>
            <Subtitle>
              <pre>
                <code>{`import {Switch} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<SwitchProps> = args => {
  return (
    <>
      <Switch label="Not Selected" tooltipProps={{ tooltipId: 'test', contentFromParent: 'Test Tooltip' }} {...args} />
      <Switch label="Selected" checked {...args} />
      <Switch label="Disabled" disabled {...args} />
      <Switch label="Disabled and Selected" disabled checked {...args} />
    </>
  )
}
