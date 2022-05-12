/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import { Popover, Spinner, Menu } from '@blueprintjs/core'
import {
  QueryList,
  IQueryListRendererProps,
  IItemRendererProps,
  IQueryListProps,
  ItemListRenderer
} from '@blueprintjs/select'

import css from './MultiSelectDropDown.css'
import { MultiSelectOption } from '../MultiSelect/MultiSelect'
import cx from 'classnames'
import { Layout } from '../../layouts/Layout'
import { Icon, IconName, IconProps } from '@harness/icons'
import { Color } from '@harness/design-system'
import { Text } from '../Text/Text'
import { StyledProps } from '@harness/design-system'
import { Checkbox } from '../Checkbox/Checkbox'
import { SelectOption } from '../Select/Select'
import { NoMatch } from '../DropDown/DropDown'

type Props = IQueryListProps<MultiSelectOption>

export interface MultiSelectDropDownProps
  extends Omit<Props, 'items' | 'selectedItems' | 'popoverProps' | 'renderer' | 'itemRenderer' | 'onItemSelect'> {
  onChange?(opts: MultiSelectOption[]): void
  value?: MultiSelectOption[]
  items: Props['items'] | (() => Promise<Props['items']>)
  usePortal?: boolean
  className?: string
  popoverClassName?: string
  minWidth?: StyledProps['width']
  width?: StyledProps['width']
  buttonTestId?: string
  isLabel?: boolean
  icon?: IconName
  iconProps?: Partial<IconProps>
  placeholder?: string
  hideItemCount?: boolean
  onPopoverClose?(opts: MultiSelectOption[]): void
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
export function MultiSelectDropDown(props: MultiSelectDropDownProps): React.ReactElement {
  const {
    onChange,
    value,
    items,
    className = '',
    popoverClassName = '',
    usePortal = false,
    placeholder = 'Select',
    minWidth = 130,
    width,
    buttonTestId = 'multi-select-dropdown-button',
    icon,
    iconProps,
    isLabel,
    disabled,
    hideItemCount,
    onPopoverClose,
    ...rest
  } = props
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectOption[]>([])
  const [dropDownItems, setDropDownItems] = React.useState<MultiSelectOption[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  React.useEffect(() => {
    if (Array.isArray(items)) {
      setDropDownItems([...items])
    } else if (typeof items === 'function') {
      setLoading(true)
      const promise = items()

      if (typeof promise.then === 'function') {
        promise.then(results => {
          setDropDownItems(results)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
  }, [JSON.stringify(items)])

  React.useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedItems(value)
    }
  }, [value])

  function handleItemSelect(item: MultiSelectOption): void {
    const index = selectedItems.findIndex(opt => opt.value === item.value)

    if (index < 0) {
      onChange?.(selectedItems.concat(item))
    } else {
      onChange?.(selectedItems.filter((_, i) => i !== index))
    }
  }

  const renderMenu: ItemListRenderer<SelectOption> = ({ items: itemsToRender, itemsParentRef, renderItem }) => {
    let renderedItems
    if (loading) {
      renderedItems = (
        <li className={css.menuItem} style={{ justifyContent: 'center' }}>
          <Spinner size={20} />
        </li>
      )
    } else if (itemsToRender.length > 0) {
      renderedItems = itemsToRender.map(renderItem).filter(item => item !== null)
    } else {
      renderedItems = <NoMatch />
    }
    return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>
  }

  const isDisabled = dropDownItems.length === 0 || !!disabled

  function renderer(listProps: IQueryListRendererProps<MultiSelectOption>): JSX.Element {
    return (
      <Popover
        targetTagName="div"
        wrapperTagName="div"
        position="bottom-left"
        usePortal={usePortal}
        minimal
        hasBackdrop
        backdropProps={{
          onClick: () => {
            setIsOpen(false)
          }
        }}
        autoFocus={false}
        enforceFocus={false}
        onClose={() => onPopoverClose?.(selectedItems)}
        className={cx(css.main, { [css.disabled]: isDisabled }, className)}
        popoverClassName={cx(css.popover, popoverClassName)}
        isOpen={isOpen}>
        <Layout.Horizontal
          data-testid={buttonTestId}
          style={width ? { width } : { minWidth }}
          className={cx(
            css.dropdownButton,
            { [css.withBorder]: !isLabel },
            { [css.selected]: selectedItems.length > 0 },
            { [css.minWidth]: !width }
          )}
          onClick={() => setIsOpen(true)}
          flex>
          <Layout.Horizontal className={css.labelWrapper} flex>
            {icon && <Icon name={icon} size={13} color={Color.GREY_600} {...iconProps} />}
            <Text data-testid="dropdown-value" className={css.label} lineClamp={1}>
              {placeholder}
            </Text>
            {!hideItemCount && selectedItems.length > 0 && (
              <Text className={css.counter}>
                {selectedItems.length <= 9 ? '0' : ''}
                {selectedItems.length}
              </Text>
            )}
          </Layout.Horizontal>
          <Icon name="main-chevron-down" size={8} color={Color.GREY_400} />
        </Layout.Horizontal>
        <React.Fragment>
          {listProps.itemList
            ? React.cloneElement(listProps.itemList as React.ReactElement, {
                className: css.menu
              })
            : null}
        </React.Fragment>
      </Popover>
    )
  }

  function itemRenderer(item: MultiSelectOption, itemProps: IItemRendererProps): JSX.Element | null {
    const { handleClick, modifiers } = itemProps
    const isSelected = value && value.findIndex(val => val.value === item.value) > -1
    return (
      <Checkbox
        key={item.value.toString()}
        className={cx(css.menuItem, {
          [css.active]: isSelected,
          [css.disabled]: modifiers.disabled || item.disabled
        })}
        onClick={e => {
          if (!modifiers.disabled && !item.disabled) {
            handleClick(e)
          }
        }}
        checked={isSelected}
        label={item.label}
      />
    )
  }

  return (
    <QueryList
      items={dropDownItems}
      itemListRenderer={renderMenu}
      renderer={renderer}
      itemRenderer={itemRenderer}
      onItemSelect={handleItemSelect}
      {...rest}
    />
  )
}
