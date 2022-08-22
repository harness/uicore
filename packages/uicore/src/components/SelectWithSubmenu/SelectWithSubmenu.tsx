/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { defaultTo, noop } from 'lodash-es'
import { Menu, MenuItem, Position } from '@blueprintjs/core'
import { ISelectProps, Suggest } from '@blueprintjs/select'

import { Text } from '../Text/Text'

import css from './SelectWithSubmenu.css'

export interface SelectWithSubmenuOption {
  label: string
  value: string
  parentLabel?: string
  parentValue?: string
  submenuItems?: SelectWithSubmenuOption[]
  hasSubmenuItems?: boolean
}

type Props = ISelectProps<SelectWithSubmenuOption>

export interface SelectWithSubmenuProps
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
  items: SelectWithSubmenuOption[]
  onChange?(opts: SelectWithSubmenuOption): void
  onSubmenuOpen?: (item?: SelectWithSubmenuOption) => Promise<void>
}

export function SelectWithSubmenu(props: SelectWithSubmenuProps): React.ReactElement {
  const { items, onChange, onSubmenuOpen, ...selectProps } = props

  const itemRenderer = useCallback(
    (item: SelectWithSubmenuOption) => {
      return (
        <Submenu
          items={defaultTo(item.submenuItems, [])}
          onChange={subItem => {
            onChange?.(subItem)
          }}
          primaryValue={item}
          onSubmenuOpen={onSubmenuOpen}
        />
      )
    },
    [items]
  )

  return (
    <Suggest
      {...selectProps}
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
            return item.hasSubmenuItems ? (
              <MenuItem
                key={index}
                className={css.menuItem}
                text={item.label}
                popoverProps={{
                  position: Position.RIGHT_TOP,
                  minimal: true
                }}>
                {props.renderItem(item, index)}
              </MenuItem>
            ) : (
              <div
                key={`${item?.value}`}
                className={css.submenuItem}
                onClick={() => {
                  onChange?.(item)
                }}>
                <Text className={css.menuItemLabel} lineClamp={1}>
                  {item.label}
                </Text>
              </div>
            )
          })}
        </Menu>
      )}
      itemRenderer={itemRenderer}
      itemsEqual={(a, b) => a.value === b.value}
    />
  )
}

interface SubmenuProps {
  items: SelectWithSubmenuOption[]
  onChange?: (item: SelectWithSubmenuOption) => void
  primaryValue?: SelectWithSubmenuOption
  onSubmenuOpen?: (item?: SelectWithSubmenuOption) => Promise<void>
}

const Submenu = ({ items, onChange, primaryValue, onSubmenuOpen }: SubmenuProps) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (onSubmenuOpen) {
      setLoading(true)
      onSubmenuOpen?.(primaryValue)
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
    <div className={css.submenu}>
      {items.map(item => {
        const itemValue = `${primaryValue?.value} | ${item.value}`

        return (
          <div
            key={itemValue}
            className={css.submenuItem}
            onClick={() => {
              console.log(itemValue, item)
              onChange?.(item)
            }}>
            <Text className={css.menuItemLabel} lineClamp={1}>
              {item.label}
            </Text>
          </div>
        )
      })}
    </div>
  ) : (
    <div className={css.noResultsFound}>No Results Found</div>
  )
}
