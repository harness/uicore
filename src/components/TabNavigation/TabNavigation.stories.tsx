import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { TabNavigation } from '../..'
import { TabNavigationProps } from '../TabNavigation/TabNavigation'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components / TabNavigation',

  component: TabNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>TabNavigation</Title>
            <Subtitle>
              <pre>
                <code>{`import {TabNavigation} from '@wings-software/uicore'`}</code>
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

export const Basic: Story<TabNavigationProps> = args => {
  const initialEntries = args.links.map(item => item.to)
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      <TabNavigation {...args} />
    </MemoryRouter>
  )
}

Basic.args = {
  size: 'normal',
  links: [
    { name: 'Tab 1', to: '/tab_1_url' },
    { name: 'Tab 2', to: '/tab_2_url' },
    { name: 'Tab 3', to: '/tab_3_url' },
    { name: 'Tab 4', to: '/tab_4_url' }
  ]
}
