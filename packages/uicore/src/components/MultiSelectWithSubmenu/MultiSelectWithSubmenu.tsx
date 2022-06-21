/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback } from 'react'
import cx from 'classnames'
import { defaultTo, omit } from 'lodash-es'
import { Checkbox, Menu, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

import { SelectOption, SelectProps } from '../Select/Select'
import { MultiSelect } from '../MultiSelect/MultiSelect'
import { Text } from '../Text/Text'

import css from './MultiSelectWithSubmenu.css'
import selectCss from '../Select/Select.css'
import { MultiTypeInputType } from 'index'

export interface SubmenuMultiSelectOption extends SelectOption {
  submenuItems: SelectOption[]
}

export interface MultiSelectWithSubmenuProps extends Omit<SelectProps, 'items' | 'onChange'> {
  items: SubmenuMultiSelectOption[]
  onChange?: (primaryValue: SelectOption, selectedValue?: SelectOption, type?: MultiTypeInputType) => void
}

interface SubmenuProps {
  items: SelectOption[]
  onChange?: (primaryValue: SelectOption, selectedValue: SelectOption, type?: MultiTypeInputType) => void
  primaryValue?: SelectOption
}

const Submenu = ({ items, onChange, primaryValue }: SubmenuProps) => {
  return (
    <Menu className={css.submenu}>
      {items?.length ? (
        items.map((item: any) => (
          <Checkbox
            key={item.value}
            label={item.label}
            onClick={() => {
              onChange?.(primaryValue as SelectOption, item)
            }}
            className={css.submenuItem}
            itemType="checkbox"
          />
        ))
      ) : (
        <div className={css.noResultsFound}>No Results Found</div>
      )}
    </Menu>
  )
}

export function MultiSelectWithSubmenu(props: MultiSelectWithSubmenuProps) {
  const { items, className, onChange, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: SelectOption) => {
      return (
        <Popover
          content={
            <Submenu
              items={(item as SubmenuMultiSelectOption).submenuItems}
              onChange={onChange}
              primaryValue={omit(item, 'submenuItems')}
            />
          }
          position={Position.LEFT_TOP}
          interactionKind={PopoverInteractionKind.CLICK}
          minimal
          usePortal
          className={css.wrapperClassName}
          targetClassName={css.targetClassName}
          modifiers={{
            preventOverflow: {
              // This is required to always attach the popover portal to the start of the reference instead of the middle
              escapeWithReference: true
            },
            offset: {
              // This is required to offset the portal after it is attached to the reference.
              // By default the portal is positioned at top: 0, left:0 wrt it's reference
              // -2 is to adjust for the removed
              offset: '0 2'
            }
          }}>
          <li
            key={item.value?.toString()}
            className={cx(selectCss.menuItem, css.menuItem)}
            onClick={event => event.preventDefault()}>
            <Text rightIcon={'chevron-right'}>{item.label}</Text>
          </li>
        </Popover>
      )
    },
    [items]
  )

  return (
    <MultiSelect
      {...selectProps}
      itemRender={itemRenderer}
      items={defaultTo(items, []) as any}
      value={[]}
      className={className}
      itemsEqual={(a, b) => a.value === b.value}
      itemDisabled={a => !a.value}
      // onItemSelect={item => console.log(item)}
      // tagRenderer={what => {
      //   console.log('what : ', what)
      //   return <div>Tests</div>
      // }}
      // onChange={onChange as MultiSelectProps['onChange']}
    />
  )
}
