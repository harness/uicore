/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { defaultTo, omit } from 'lodash-es'
import { Menu, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

import { SelectOption, SelectProps } from '../Select/Select'
import { MultiSelect } from '../MultiSelect/MultiSelect'
import { MultiTypeInputType } from '../MultiTypeInput/MultiTypeInputUtils'
import { Text } from '../Text/Text'

import css from './MultiSelectWithSubmenu.css'
import selectCss from '../Select/Select.css'

export interface SubmenuMultiSelectOption extends SelectOption {
  submenuItems: SelectOption[]
}

export interface MultiSelectWithSubmenuProps extends Omit<SelectProps, 'items' | 'onChange' | 'value'> {
  items: SubmenuMultiSelectOption[]
  onChange?: (primaryValue: SelectOption, selectedValue?: SelectOption, type?: MultiTypeInputType) => void
  onSubmenuOpen?: (value?: string) => Promise<void>
}

interface SubmenuProps {
  items: SelectOption[]
  onChange?: (primaryValue: SelectOption, selectedValue: SelectOption, type?: MultiTypeInputType) => void
  primaryValue?: SelectOption
  onSubmenuOpen?: (value?: string) => Promise<void>
}

const Submenu = ({ items, onChange, primaryValue, onSubmenuOpen }: SubmenuProps) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (onSubmenuOpen) {
      setLoading(true)
      onSubmenuOpen?.(primaryValue?.value as string)
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <Menu className={css.submenu}>
      {loading ? (
        <div className={css.loading}>Loading...</div>
      ) : items?.length ? (
        items.map(item => (
          <label
            key={item.value.toString()}
            className={css.submenuItem}
            onClick={() => {
              onChange?.(primaryValue as SelectOption, item)
            }}>
            <input className={css.checkbox} type="checkbox" />
            <Text className={css.menuItemLabel} lineClamp={1} onClick={event => event?.stopPropagation()}>
              {item.label}
            </Text>
          </label>
        ))
      ) : (
        <div className={css.noResultsFound}>No Results Found</div>
      )}
    </Menu>
  )
}

export function MultiSelectWithSubmenu(props: MultiSelectWithSubmenuProps) {
  const { items, onChange, onSubmenuOpen, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: SelectOption) => {
      return (
        <Popover
          content={
            <Submenu
              items={(item as SubmenuMultiSelectOption).submenuItems}
              onChange={onChange}
              primaryValue={omit(item, 'submenuItems')}
              onSubmenuOpen={onSubmenuOpen}
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
      items={defaultTo(items, [])}
      itemsEqual={(a, b) => a.value === b.value}
      itemDisabled={a => !a.value}
      tagRenderer={(item: any) => (
        <div>
          {item.parentLabel}|{item.label}
        </div>
      )}
      tagInputProps={{
        onRemove(item: React.ReactNode) {
          const values = (item as ReactElement)?.props?.children
          onChange?.(
            {
              label: values[0],
              value: values[0]
            },
            {
              label: values[2],
              value: values[2],
              parentLabel: values[0],
              parentValue: values[0]
            } as any
          )
        }
      }}
    />
  )
}
