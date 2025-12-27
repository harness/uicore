/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback } from 'react'
import cx from 'classnames'
import { omit } from 'lodash-es'
import { Menu, MenuItem, PopoverInteractionKind, Position } from '@blueprintjs/core'
import { Popover } from '../Popover/Popover'

import { Text } from '../Text/Text'

import css from './SelectWithSubmenuV2.css'
import selectCss from '../Select/Select.css'
import { SelectProps, SelectOption, Select } from '../../components/Select/Select'
import { MultiTypeInputType } from 'index'

export interface SubmenuSelectOption extends SelectOption {
  submenuItems: SelectOption[]
  hasSubItems?: boolean
}

export interface SelectWithSubmenuPropsV2 extends Omit<SelectProps, 'items' | 'onChange'> {
  items: SubmenuSelectOption[]
  loading?: boolean
  onOpening?: (item: SelectOption) => void
  interactionKind?: PopoverInteractionKind
  onChange?: (primaryValue: SelectOption, selectedValue?: SelectOption, type?: MultiTypeInputType) => void
}

interface SubmenuProps {
  items: SelectOption[]
  loading?: boolean
  onChange?: (primaryValue: SelectOption, selectedValue: SelectOption, type?: MultiTypeInputType) => void
  primaryValue?: SelectOption
}
const SubmenuV2 = ({ items, onChange, primaryValue, loading }: SubmenuProps) => {
  return (
    <Menu className={css.submenu}>
      {loading ? (
        <div className={css.noResultsFound}>Loading...</div>
      ) : items?.length ? (
        items.map((item: any) => (
          <MenuItem
            key={item.value}
            text={item.label}
            onClick={() => {
              onChange?.(primaryValue as SelectOption, item)
            }}
            className={css.submenuItem}
          />
        ))
      ) : (
        <div className={css.noResultsFound}>No Results Found</div>
      )}
    </Menu>
  )
}

export function SelectWithSubmenuV2(props: SelectWithSubmenuPropsV2) {
  const { items, className, loading, onChange, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: SelectOption) => {
      return (item as SubmenuSelectOption).hasSubItems ? (
        <Popover
          content={
            <SubmenuV2
              items={(item as SubmenuSelectOption).submenuItems}
              onChange={onChange}
              primaryValue={omit(item, 'submenuItems')}
              loading={loading}
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
          popoverClassName={css.targetClassName}>
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
              onChange(item)
            }
          }}>
          <Text>{item.label}</Text>
        </li>
      )
    },
    [items, loading]
  )

  return (
    <Select
      {...selectProps}
      items={items}
      itemRenderer={itemRenderer}
      className={className}
      onChange={onChange as SelectProps['onChange']}
    />
  )
}
