/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CollapseList, CollapseListPanel } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { CollapseListPanelProps } from '../Collapse/CollapseListPanel'

export default {
  title: 'Components / CollapseList',

  component: CollapseListPanel,
  subcomponents: { CollapseList },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CollapseList</Title>

            <Subtitle>
              <pre>
                <code>{`import { CollapseList, CollapseListPanel  }  from '@wings-software/uicore'`}</code>
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
export const Basic: Story<CollapseListPanelProps> = args => {
  return (
    <CollapseList>
      <CollapseListPanel
        collapseHeaderProps={{
          heading: 'Click here to collapse or expand',
          isRemovable: true,
          onRemove: () => {
            alert('This component will get removed')
          }
        }}
        {...args}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </CollapseListPanel>
      <CollapseListPanel
        collapseHeaderProps={{
          heading: 'Click here to collapse or expand',
          isRemovable: true,
          onRemove: () => {
            alert('This component will get removed')
          }
        }}
        {...args}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </CollapseListPanel>
      <CollapseListPanel
        collapseHeaderProps={{
          heading: 'Click here to collapse or expand',
          isRemovable: true,
          onRemove: () => {
            alert('This component will get removed')
          }
        }}
        {...args}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </CollapseListPanel>
      <CollapseListPanel
        collapseHeaderProps={{
          heading: 'Click here to collapse or expand',
          isRemovable: true,
          onRemove: () => {
            alert('This component will get removed')
          }
        }}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </CollapseListPanel>
      <CollapseListPanel
        collapseHeaderProps={{
          heading: 'Click here to collapse or expand',
          isRemovable: true,
          onRemove: () => {
            alert('This component will get removed')
          }
        }}
        openNext={() => alert('Custom next function')}
        {...args}>
        Hello world The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick
        brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog The quick brown fox jumps
        over the lazy dog The quick brown fox jumps over the lazy dog <br />
        The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox
        jumps over the lazy dog The quick brown fox jumps over the lazy dog
      </CollapseListPanel>
    </CollapseList>
  )
}
