/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback } from 'react'
import cx from 'classnames'
import { omit } from 'lodash-es'
import { Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

import { Select, SelectOption, SelectProps } from '../Select/Select'
import { Text } from '../Text/Text'

import css from './SelectWithSubmenu.css'
import selectCss from '../Select/Select.css'
import { MultiTypeInputType } from 'index'

export interface SubmenuSelectOption extends SelectOption {
  submenuItems: SelectOption[]
  hasSubItems?: boolean
}

export interface SelectWithSubmenuProps extends Omit<SelectProps, 'items' | 'onChange'> {
  items: SubmenuSelectOption[]
  onOpening?: (item: SelectOption) => void
  interactionKind?: PopoverInteractionKind
  onChange?: (primaryValue: SelectOption, selectedValue?: SelectOption, type?: MultiTypeInputType) => void
}

interface SubmenuProps {
  items: SelectOption[]
  onChange?: (primaryValue: SelectOption, selectedValue: SelectOption, type?: MultiTypeInputType) => void
  primaryValue?: SelectOption
}

const Submenu = ({ items, onChange, primaryValue }: SubmenuProps) => (
  <Menu className={css.submenu}>
    {items?.map((item: any) => (
      <MenuItem
        key={item.value}
        text={item.label}
        onClick={(_: any) => onChange?.(primaryValue as SelectOption, item)}
        className={css.submenuItem}
      />
    ))}
  </Menu>
)

export function SelectWithSubmenu(props: SelectWithSubmenuProps) {
  const { items, className, onChange, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: SelectOption) => {
      return (item as SubmenuSelectOption).hasSubItems ? (
        <Popover
          content={
            <Submenu
              items={(item as SubmenuSelectOption).submenuItems}
              onChange={onChange}
              primaryValue={omit(item, 'submenuItems')}
            />
          }
          position={Position.LEFT_TOP}
          interactionKind={props?.interactionKind || PopoverInteractionKind.HOVER}
          onOpening={() => {
            if (props.onOpening) props.onOpening(item)
          }}
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
      ) : (
        <li
          key={item.value?.toString()}
          className={cx(selectCss.menuItem, css.menuItem)}
          onClick={() => {
            if (onChange) {
              onChange(item as SelectOption)
            }
          }}>
          <Text>{item.label}</Text>
        </li>
      )
    },
    [items]
  )

  return <Select {...selectProps} items={items} itemRenderer={itemRenderer} className={className} />
}
