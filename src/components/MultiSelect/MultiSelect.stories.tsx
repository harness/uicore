import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { MultiSelect } from '../..'
import { MultiSelectOption, MultiSelectProps } from '../MultiSelect/MultiSelect'
import { omit } from 'lodash-es'
import data from '../../_stories/components/pokedex.json'

export default {
  title: 'Form / MultiSelect',

  component: MultiSelect,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>MultiSelect</Title>
            <Subtitle>
              <pre>
                <code>{`import {MultiSelect} from '@wings-software/uicore'`}</code>
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
const localItems: MultiSelectOption[] = data.map((row, i) => ({
  label: row.name,
  value: row.id,
  disabled: i < 3
}))

export const Basic: Story<MultiSelectProps> = args => {
  const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value', 'itemRender', 'tagRenderer'])

  const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))
  return (
    <MultiSelect
      items={items}
      value={value}
      onChange={items => {
        setValue(items)
      }}
      {...argsCopy}
    />
  )
}
function dummyPromise(): Promise<MultiSelectOption[]> {
  return new Promise<MultiSelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(localItems)
    }, 5000)
  })
}
export const AsyncSelect: Story<MultiSelectProps> = args => {
  const { items = dummyPromise } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value', 'itemRender', 'tagRenderer'])
  const [value, setValue] = React.useState<MultiSelectOption[]>([])

  return (
    <MultiSelect
      items={items}
      value={value}
      onChange={items => {
        setValue(items)
      }}
      {...argsCopy}
    />
  )
}
