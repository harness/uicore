/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { MultiSelectOption } from '../../../MultiSelect/MultiSelect'
import { omit } from 'lodash-es'
import data from '../../../../_stories/components/pokedex.json'
import { FiltersMultiSelectDropDown, FilterMultiSelectDropDownProps } from './FiltersMultiSelectDropDown'
import { Layout } from '../../../../layouts/Layout'
import { ItemRendererProps as BpItemRendererProps } from '@blueprintjs/select'
import { Checkbox } from '../../../Checkbox/Checkbox'
import { Text } from '../../../Text/Text'
import { FontVariation } from '@harness/design-system'
import { Icon } from '@harness/icons'
import css from './FiltersMultiSelectDropDown.css'

export default {
  title: 'Components / FiltersMultiSelectDropDown',

  component: FiltersMultiSelectDropDown,
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
                <code>{`import {FiltersMultiSelectDropDown} from '@harness/uicore'`}</code>
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
export const Basic: Story<FilterMultiSelectDropDownProps> = args => {
  const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))

  return (
    <Layout.Horizontal flex>
      <FiltersMultiSelectDropDown
        items={items}
        value={value}
        placeholder={'Pokemon'}
        allowSearch
        onChange={items => {
          setValue(items)
        }}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}

export const WithTooltip: Story<FilterMultiSelectDropDownProps> = args => {
  const { items = localItems } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])

  const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))

  return (
    <Layout.Horizontal flex>
      <FiltersMultiSelectDropDown
        items={items}
        value={value}
        placeholder={'Pokemon'}
        allowSearch
        onChange={items => {
          setValue(items)
        }}
        tooltip="Tooltip"
        tooltipProps={{
          position: 'right'
        }}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}

export const Custom: Story<FilterMultiSelectDropDownProps> = args => {
  const { items = localItems } = args
  const argsCopy = omit(args, ['items', 'onChange', 'value', 'listItemRenderer'])
  const [value, setValue] = React.useState<MultiSelectOption[]>(localItems.slice(0, 3))

  const itemRenderer = (item: MultiSelectOption, itemProps: BpItemRendererProps): JSX.Element | null => {
    const { handleClick, modifiers } = itemProps
    const isSelected = value && value.findIndex(val => val.value === item.value) > -1
    return (
      <Checkbox
        key={item.value.toString()}
        checked={isSelected}
        className={cx(css.menuItem, {
          [css.active]: isSelected
        })}
        onClick={e => {
          if (!modifiers.disabled && !item.disabled) handleClick(e)
        }}>
        <Layout.Horizontal spacing="xsmall" flex={{ alignItems: 'center' }}>
          <Icon name="harness" size={12} />
          <Text font={{ variation: FontVariation.SMALL, weight: 'light' }}>{item.label}</Text>
        </Layout.Horizontal>
      </Checkbox>
    )
  }

  return (
    <Layout.Horizontal flex>
      <FiltersMultiSelectDropDown
        items={items}
        value={value}
        placeholder={'Pokemon'}
        allowSearch
        onChange={items => {
          setValue(items)
        }}
        listItemRenderer={itemRenderer}
        {...argsCopy}
      />
    </Layout.Horizontal>
  )
}

function dummyPromise(): Promise<MultiSelectOption[]> {
  return new Promise<MultiSelectOption[]>(resolve => {
    setTimeout(() => {
      resolve(localItems)
    }, 5000)
  })
}
export const AsyncSelect: Story<FilterMultiSelectDropDownProps> = args => {
  const { items = dummyPromise } = args

  const argsCopy = omit(args, ['items', 'onChange', 'value'])
  const [value, setValue] = React.useState<MultiSelectOption[]>([])

  return (
    <Layout.Horizontal flex>
      <FiltersMultiSelectDropDown
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
