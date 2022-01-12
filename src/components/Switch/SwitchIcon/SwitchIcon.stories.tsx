/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { SwitchIcon } from '../../..'
import { SwitchIconProps } from '../SwitchIcon/SwitchIcon'

export default {
  title: 'Components / SwitchIcon',

  component: SwitchIcon,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SwitchIcon</Title>
            <Subtitle>
              <pre>
                <code>{`import {SwitchIcon} from '@harness/uicore'`}</code>
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
export const Basic: Story<SwitchIconProps> = args => {
  return (
    <>
      <b>Default View - Without Label</b>
      <SwitchIcon {...args} />
      <b>Default Checked</b>
      <SwitchIcon defaultChecked labelElement={<div>Rollback</div>} {...args} />
      <b>Label</b>
      <SwitchIcon label="Rollback" onChange={(e: any) => console.dir(e?.target?.checked)} {...args} />
      <b>Disabled</b>
      <SwitchIcon label="Rollback" disabled onChange={(e: any) => console.dir(e?.target?.checked)} {...args} />
      <b>Disabled with checked</b>
      <SwitchIcon checked label="Rollback" disabled onChange={(e: any) => console.dir(e?.target?.checked)} {...args} />
    </>
  )
}
Basic.args = { icon: 'play', iconChecked: 'command-rollback' }
