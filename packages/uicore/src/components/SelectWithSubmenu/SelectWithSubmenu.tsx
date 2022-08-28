/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { defaultTo } from 'lodash-es'
import { Menu, MenuItem, Position } from '@blueprintjs/core'
import { ISelectProps, Suggest } from '@blueprintjs/select'

import { Text } from '../Text/Text'

import css from './SelectWithSubmenu.css'
import { Button } from '../../components/Button/Button'

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
  allowCreatingNewItems?: boolean
  items: SelectWithSubmenuOption[]
  value?: SelectWithSubmenuOption
  onChange?(opts: SelectWithSubmenuOption): void
  onSubmenuOpen?: (item?: SelectWithSubmenuOption) => Promise<void>
}

export function SelectWithSubmenu(props: SelectWithSubmenuProps): React.ReactElement {
  const { items, onChange, onSubmenuOpen, allowCreatingNewItems, value, ...selectProps } = props
  const [selectedItem, setSelectedItem] = useState<SelectWithSubmenuOption | undefined>(undefined)
  const itemRenderer = useCallback(
    (item: SelectWithSubmenuOption, { handleClick }) => {
      return item.hasSubmenuItems ? (
        <Submenu
          items={defaultTo(item.submenuItems, [])}
          onChange={subItem => {
            onChange?.(subItem)
            handleClick()
          }}
          primaryValue={item}
          onSubmenuOpen={onSubmenuOpen}
        />
      ) : (
        <div
          key={`${item?.value}`}
          className={css.submenuItem}
          onClick={() => {
            onChange?.(item)
            handleClick()
          }}>
          <Text className={css.menuItemLabel} lineClamp={1}>
            {item.label}
          </Text>
        </div>
      )
    },
    [items]
  )
  React.useEffect(() => {
    setSelectedItem(value)
  }, [value])

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
      itemListPredicate={(query, items) =>
        items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase()))
      }
      onItemSelect={item => setSelectedItem(item)}
      selectedItem={selectedItem}
      items={items}
      inputValueRenderer={opt => opt.label}
      itemListRenderer={props => (
        <Menu className={css.menu}>
          {props.filteredItems.map((item, index) => {
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
              props.renderItem(item, index)
            )
          })}
          {props.filteredItems.length === 0 && (
            <React.Fragment>
              {props.filteredItems.length === 0 ? <div className={css.noResultsFound}>Nothing Found</div> : null}
              {allowCreatingNewItems && (
                <Button
                  intent="primary"
                  minimal
                  text={props.query}
                  icon="plus"
                  className={css.createNewItemButton}
                  onClick={() => onChange?.({ label: props.query, value: props.query })}
                />
              )}
            </React.Fragment>
          )}
        </Menu>
      )}
      itemRenderer={itemRenderer}
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
