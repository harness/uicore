/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { omit } from 'lodash-es'
import { FilterTagInput, FilterTagInputProps } from './FilterTagInput'
import { Layout } from '../../../../layouts/Layout'

export default {
  title: 'Components / FilterTagInput',

  component: FilterTagInput,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>FilterTagInput</Title>
            <Subtitle>
              <pre>
                <code>{`import {FilterTagInput} from '@harness/uicore'`}</code>
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

export const Basic: Story<FilterTagInputProps> = args => {
  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  return (
    <Layout.Horizontal flex>
      <FilterTagInput placeholder={'Pokemon'} value={['Bulbasaur', 'Ivysaur']} {...argsCopy} />
    </Layout.Horizontal>
  )
}

export const FilterTagInputWithExternalState: Story<FilterTagInputProps> = args => {
  const argsCopy = omit(args, ['items', 'onChange', 'value', 'onRemove'])
  const [filterValue, setFilterValue] = React.useState<string[]>(['Bulbasaur', 'Ivysaur'])
  return (
    <Layout.Horizontal flex>
      <FilterTagInput
        placeholder={'Pokemon'}
        value={filterValue}
        onChange={(value: string[]) => setFilterValue(value)}
        onRemove={() => setFilterValue([])}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}
