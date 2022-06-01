/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback } from 'react'
import { Select, SelectOption, SelectProps } from '../Select/Select'
import { FormGroup, Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import selectCss from '../Select/Select.css'
import css from './SelectWithSubmenu.css'

interface SubmenuSelectOption extends SelectOption {
  submenuItems: SelectOption[]
}

export interface SelectWithSubmenuProps extends Omit<SelectProps, 'items'> {
  items: SubmenuSelectOption[]
  itemSelect: any
  loading?: boolean
  label?: string
  helperText?: string
}

const Submenu = ({ items, itemSelect }: SelectWithSubmenuProps) => (
  <Menu>
    {items?.map((item: any) => (
      <MenuItem text={item.label} onClick={(_: any) => itemSelect(item)} textClassName={selectCss.menuItem} />
    ))}
  </Menu>
)

export function SelectWithSubmenu(props: SelectWithSubmenuProps) {
  const { items, className, itemSelect, loading, label, disabled, helperText, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: any) => {
      return (
        <Popover
          content={<Submenu items={item.submenuItems} itemSelect={itemSelect} />}
          position={Position.LEFT_TOP}
          interactionKind={PopoverInteractionKind.HOVER}
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
          <li key={item.value?.toString()} className={selectCss.menuItem}>
            {item.label}
          </li>
        </Popover>
      )
    },
    [items]
  )

  return (
    <FormGroup label={label} disabled={disabled} helperText={helperText}>
      <Select
        {...selectProps}
        disabled={disabled}
        allowCreatingNewItems={false}
        items={loading ? [{ value: '', label: 'Loading...' }] : items}
        itemRenderer={itemRenderer}
        className={className}
      />
    </FormGroup>
  )
}
