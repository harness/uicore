/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { defaultTo, omit } from 'lodash-es'
import { Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import { ISelectProps, Suggest } from '@blueprintjs/select'

import { Text } from '../Text/Text'

import css from './SelectWithSubmenu.css'
import { Button } from '../../components/Button/Button'
import selectCss from '../Select/Select.css'
import { SelectProps, SelectOption, Select } from '../../components/Select/Select'
import { MultiTypeInputType } from 'index'

export interface SelectWithSubmenuOption {
  label: string
  value: string
  parentLabel?: string
  parentValue?: string
  submenuItems?: SelectWithSubmenuOption[]
  hasSubmenuItems?: boolean
}

export interface SubmenuSelectOption extends SelectOption {
  submenuItems: SelectOption[]
  hasSubItems?: boolean
}

type Props = ISelectProps<SelectWithSubmenuOption>

export interface SelectWithSubmenuPropsV1
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
export interface SelectWithSubmenuPropsV2 extends Omit<SelectProps, 'items' | 'onChange'> {
  items: SubmenuSelectOption[]
  loading?: boolean
  onOpening?: (item: SelectOption) => void
  interactionKind?: PopoverInteractionKind
  onChange?: (primaryValue: SelectOption, selectedValue?: SelectOption, type?: MultiTypeInputType) => void
}

export function SelectWithSubmenuV1(props: SelectWithSubmenuPropsV1): React.ReactElement {
  const { items, onChange, onSubmenuOpen, allowCreatingNewItems, value, ...selectProps } = props
  const [selectedItem, setSelectedItem] = useState<SelectWithSubmenuOption | undefined>(undefined)
  const itemRenderer = useCallback(
    (item: SelectWithSubmenuOption, { handleClick }) => {
      return item.hasSubmenuItems ? (
        <SubmenuV1
          items={defaultTo(item.submenuItems, [])}
          onChange={subItem => {
            onChange?.(subItem)
            handleClick()
          }}
          primaryValue={item}
          onSubmenuOpen={onSubmenuOpen}
        />
      ) : item.value === 'newlyCreatedItem' ? (
        <Button
          intent="primary"
          minimal
          text={item.label}
          icon="plus"
          className={css.createNewItemButton}
          onClick={() => {
            onChange?.({ label: item.label, value: item.label })
            handleClick()
          }}
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
              {allowCreatingNewItems &&
                props.query?.length > 0 &&
                props.renderItem({ label: props.query, value: `newlyCreatedItem` }, 0)}
            </React.Fragment>
          )}
        </Menu>
      )}
      itemRenderer={itemRenderer}
    />
  )
}

interface SubmenuPropsV1 {
  items: SelectWithSubmenuOption[]
  onChange?: (item: SelectWithSubmenuOption) => void
  primaryValue?: SelectWithSubmenuOption
  onSubmenuOpen?: (item?: SelectWithSubmenuOption) => Promise<void>
}

const SubmenuV1 = ({ items, onChange, primaryValue, onSubmenuOpen }: SubmenuPropsV1) => {
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
