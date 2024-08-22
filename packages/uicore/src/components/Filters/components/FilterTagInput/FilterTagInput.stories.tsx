/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { isEmpty, isNil, isUndefined } from 'lodash-es'
import { FilterTagInput, FilterTagInputProps } from './FilterTagInput'
import { Layout } from '../../../../layouts/Layout'

type NGTagUI = {
  key: string
  value?: string | null | undefined
}

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

export const Basic: Story<FilterTagInputProps> = () => {
  const getLabelFromTag = (tag: NGTagUI): string => {
    let { key, value } = tag
    // The value of a 'key' is coming as a number at runtime as we are reading this param from queryparams.
    // So though this declared as string, we have to use toString to convert them to string
    key = key.toString().trim()
    // check for null or undefined
    if (value) {
      value = typeof value === 'string' ? value.trim() : String(value)
    }

    const label = [
      ...(!isEmpty(key) ? [key.trim()] : []),
      ...(!isNil(value) ? [':'] : []),
      ...(!isEmpty(value) ? [value] : [])
    ].join('')

    return label
  }

  const getTagFromLabel = (tagLabel: string): NGTagUI => {
    const [key, value] = tagLabel.split(':')

    return {
      key: key.trim(),
      value: !isUndefined(value) ? value?.trim() || '' : null
    }
  }

  return (
    <Layout.Horizontal flex>
      <FilterTagInput
        allowNewTag={true}
        showAddTagButton={false}
        showClearAllButton={true}
        noResults={null}
        keyOf={(item: string) => item}
        placeholder={'Placeholder'}
        //   items={[{ key: 'key', value: 'value' }]}
        items={[]}
        labelFor={item => getLabelFromTag(item as NGTagUI)}
        itemFromNewTag={getTagFromLabel}
        usePortal={true}
      />
    </Layout.Horizontal>
  )
}
