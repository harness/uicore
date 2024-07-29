/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { omit } from 'lodash-es'
import { FilterTextInput, FilterTextInputProps } from './FilterTextInput'
import { Layout } from '../../../../layouts/Layout'

export default {
  title: 'Components / FilterTextInput',

  component: FilterTextInput,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FiltersMultiSelectDropDown</Title>
            <Subtitle>
              <pre>
                <code>{`import {FilterTextInput} from '@harness/uicore'`}</code>
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

export const Basic: Story<FilterTextInputProps> = args => {
  //   const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  //   const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))

  return (
    <Layout.Horizontal flex>
      <FilterTextInput
        // items={items}
        // value={value}
        placeholder={'Pokemon'}
        value={['Bulbasaur', 'Ivysaur']}
        // allowSearch
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}
