/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { SelectOption } from '../../../Select/Select'
import { omit } from 'lodash-es'
import data from '../../../../_stories/components/pokedex.json'
import { FiltersSelectDropDown, FilterSelectDropDownProps } from './FiltersSelectDropDown'
import { Layout } from '../../../../layouts/Layout'

export default {
  title: 'Components / FiltersSelectDropDown',

  component: FiltersSelectDropDown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FiltersSelectDropDown</Title>
            <Subtitle>
              <pre>
                <code>{`import {FiltersSelectDropDown} from '@harness/uicore'`}</code>
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
const localItems: SelectOption[] = data.map((row, i) => ({
  label: row.name,
  value: row.id,
  disabled: i < 3
}))
export const Basic: Story<FilterSelectDropDownProps> = args => {
  const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  const [value, setValue] = React.useState<SelectOption>({ label: 'Bulbasaur', value: 1 })

  return (
    <Layout.Horizontal flex>
      <FiltersSelectDropDown
        items={items}
        value={value}
        allowSearch
        showDropDownIcon
        onChange={items => {
          setValue(items)
        }}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}
function dummyPromise(): Promise<SelectOption[]> {
  return new Promise<SelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(localItems)
    }, 5000)
  })
}
export const AsyncSelect: Story<FilterSelectDropDownProps> = args => {
  const { items = dummyPromise } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])
  const [value, setValue] = React.useState<SelectOption>()

  return (
    <Layout.Horizontal flex>
      <FiltersSelectDropDown
        items={items}
        value={value}
        onChange={items => {
          setValue(items)
        }}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}
