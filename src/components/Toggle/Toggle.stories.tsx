import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import { Toggle, ToggleProps } from './Toggle'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components / Toggle',

  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Toggle</Title>

            <Description>
              The Toggle component operates in the same manner as the Checkbox component with a different visual
              appearance.
            </Description>
            <Subtitle>
              <pre>
                <code>{`import { Toggle }  from '@harness/uicore'`}</code>
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
  argTypes: { onChange: { action: 'changed' } }
} as Meta

export const Basic: Story<ToggleProps> = args => (
  <>
    <Toggle {...args} label="Off" value="one" />
    <Toggle {...args} label="On" value="two" checked />
    <Toggle {...args} label="Off disabled" value="three" disabled />
    <Toggle {...args} label="On disabled" value="four" disabled checked />
  </>
)

export const ActiveState: Story<ToggleProps> = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Toggle
      label={checked ? 'On' : 'Off'}
      value="test"
      checked={checked}
      onToggle={isToggled => {
        action('toggle')(isToggled)
        setChecked(isToggled)
      }}
      onChange={e => action('change')(e)}
    />
  )
}

export const DisabledState: Story<ToggleProps> = () => (
  <>
    <Toggle label="Off and disabled" value="test" disabled />
    <Toggle label="On and disabled" value="test" checked disabled />
  </>
)
