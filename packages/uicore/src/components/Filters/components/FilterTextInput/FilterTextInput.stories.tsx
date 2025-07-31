/*
 * Copyright 2024 Harness Inc. All rights reserved.
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
            <Title>FilterTextInput</Title>
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
  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  return (
    <Layout.Horizontal flex>
      <FilterTextInput enableMultiInput placeholder={'Pokemon'} value={['Bulbasaur', 'Ivysaur']} {...argsCopy} />
    </Layout.Horizontal>
  )
}

/**
 * FilterTextInput is a component that combines the functionality of TextInput and TagsInput.
 * The component also supports multi input. The user can type in multiple values separated by comma
 * The user can type in free text and it will be added as a tag or just a simple text.
 *
 * This is a variant of FilterTextInput that is a *pseudo* controlled component where you can
 * 1. populate initial data using value during component mount
 * 2. Reset the value using the onRemove prop.
 *
 */
export const FilterTextInputWithExternalState: Story<FilterTextInputProps> = args => {
  const argsCopy = omit(args, ['items', 'onChange', 'value', 'onRemove'])
  const [filterValue, setFilterValue] = React.useState<string[] | string>(['Bulbasaur', 'Ivysaur'])
  return (
    <Layout.Horizontal flex>
      <FilterTextInput
        enableMultiInput
        placeholder={'Pokemon'}
        value={filterValue}
        onChange={(value: string[] | string) => setFilterValue(value)}
        onRemove={() => setFilterValue([])}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}
