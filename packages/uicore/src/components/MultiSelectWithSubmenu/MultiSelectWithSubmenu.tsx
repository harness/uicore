/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { defaultTo, noop } from 'lodash-es'
import { Menu, MenuItem, Position } from '@blueprintjs/core'
import { IMultiSelectProps, MultiSelect } from '@blueprintjs/select'

import { Text } from '../Text/Text'

import css from './MultiSelectWithSubmenu.css'

export interface MultiSelectWithSubmenuOption {
  label: string
  value: string
  parentLabel?: string
  parentValue?: string
  submenuItems?: MultiSelectWithSubmenuOption[]
}

type Props = IMultiSelectProps<MultiSelectWithSubmenuOption>

export interface MultiSelectWithSubmenuProps
  extends Omit<
    Props,
    | 'popoverProps'
    | 'selectedItems'
    | 'itemRenderer'
    | 'onItemSelect'
    | 'items'
    | 'tagRenderer'
    | 'activeItem'
    | 'onActiveItemChange'
  > {
  items: MultiSelectWithSubmenuOption[]
  onChange?(opts: MultiSelectWithSubmenuOption[]): void
  onSubmenuOpen?: (value?: string) => Promise<void>
  value?: MultiSelectWithSubmenuOption[]
}

export function MultiSelectWithSubmenu(props: MultiSelectWithSubmenuProps) {
  const { items, onChange, onSubmenuOpen, value, ...multiSelectProps } = props

  const itemRenderer = useCallback(
    (item: MultiSelectWithSubmenuOption) => {
      return (
        <Submenu
          items={defaultTo(item.submenuItems, [])}
          onChange={subItem => {
            onChange?.(subItem)
          }}
          primaryValue={item}
          onSubmenuOpen={onSubmenuOpen}
          value={defaultTo(value, [])}
        />
      )
    },
    [items]
  )

  return (
    <MultiSelect
      {...multiSelectProps}
      popoverProps={{
        minimal: true,
        className: css.main,
        fill: true,
        modifiers: {
          preventOverflow: {
            escapeWithReference: true
          },
          offset: {
            offset: '0 2'
          }
        }
      }}
      onItemSelect={noop}
      items={items}
      itemListRenderer={props => (
        <Menu className={css.menu}>
          {props.items.map((item, index) => {
            return (
              <MenuItem
                key={index}
                className={css.menuItem}
                text={item.label}
                shouldDismissPopover={false}
                popoverProps={{
                  position: Position.RIGHT_TOP,
                  minimal: true
                }}>
                {props.renderItem(item, index)}
              </MenuItem>
            )
          })}
        </Menu>
      )}
      itemRenderer={itemRenderer}
      itemsEqual={(a, b) => a.value === b.value}
      tagRenderer={item => `${item.parentLabel} | ${item.label}`}
      tagInputProps={{
        onRemove: item => {
          if (value?.length) {
            const index = value.findIndex(opt => `${opt.parentLabel} | ${opt.label}` === item)
            onChange?.(value?.filter((_, i) => i !== index))
          }
        },
        tagProps: {
          className: css.tag
        }
      }}
    />
  )
}

interface SubmenuProps {
  items: MultiSelectWithSubmenuOption[]
  onChange?: (item: MultiSelectWithSubmenuOption[]) => void
  primaryValue?: MultiSelectWithSubmenuOption
  onSubmenuOpen?: (value?: string) => Promise<void>
  value: MultiSelectWithSubmenuOption[]
}

const Submenu = ({ items, onChange, primaryValue, onSubmenuOpen, value }: SubmenuProps) => {
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

  return loading ? (
    <div className={css.loading}>Loading...</div>
  ) : items?.length ? (
    <>
      {items.map(item => {
        const itemValue = `${primaryValue?.value} | ${item.value}`

        return (
          <div
            key={itemValue}
            className={css.submenuItem}
            onClick={() => {
              const index = value.findIndex(opt => opt.value === item.value)

              if (index < 0) {
                onChange?.(value.concat(item))
              } else {
                onChange?.(value.filter((_, i) => i !== index))
              }
            }}>
            <input
              id={itemValue}
              className={css.checkbox}
              type="checkbox"
              checked={value && value.findIndex(val => `${val.parentValue} | ${val.value}` === itemValue) > -1}
            />
            <label key={item.value.toString()} htmlFor={itemValue} onClick={event => event.preventDefault()}>
              <Text className={css.menuItemLabel} lineClamp={1}>
                {item.label}
              </Text>
            </label>
          </div>
        )
      })}
    </>
  ) : (
    <div className={css.noResultsFound}>No Results Found</div>
  )
}
