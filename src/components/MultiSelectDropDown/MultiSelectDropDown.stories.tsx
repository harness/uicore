import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { MultiSelectOption } from '../MultiSelect/MultiSelect'
import { omit } from 'lodash-es'
import data from '../../_stories/components/pokedex.json'
import { MultiSelectDropDown, MultiSelectDropDownProps } from './MultiSelectDropDown'

export default {
  title: 'Form / MultiSelectDropDown',

  component: MultiSelectDropDown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>MultiSelectDropDown</Title>
            <Subtitle>
              <pre>
                <code>{`import {MultiSelectDropDown} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<MultiSelectDropDownProps> = args => {
  const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))

  return (
    <MultiSelectDropDown
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
export const AsyncSelect: Story<MultiSelectDropDownProps> = args => {
  const { items = dummyPromise } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])
  const [value, setValue] = React.useState<MultiSelectOption[]>([])

  return (
    <MultiSelectDropDown
      items={items}
      value={value}
      onChange={items => {
        setValue(items)
      }}
      {...argsCopy}
    />
  )
}
