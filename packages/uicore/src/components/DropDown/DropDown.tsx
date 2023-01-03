/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { Select as BPSelect, ISelectProps, IItemRendererProps, ItemListRenderer } from '@blueprintjs/select'
import { Button } from '../Button/Button'
import { Color } from '@harness/design-system'
import { Layout } from '../../layouts/Layout'
import css from './DropDown.css'
import { SelectOption } from '../Select/Select'
import { Icon, IconName, IconProps } from '@harness/icons'
import { Text } from '../Text/Text'
import cx from 'classnames'
import { Menu, Position, Spinner } from '@blueprintjs/core'
import { StyledProps } from '@harness/design-system'
import { debounce } from 'lodash-es'

const Select = BPSelect.ofType<SelectOption>()

type Props = ISelectProps<SelectOption>

export interface DropDownProps
  extends Omit<
    Props,
    'popoverProps' | 'itemRenderer' | 'onItemSelect' | 'items' | 'activeItem' | 'onActiveItemChange' | 'inputProps'
  > {
  itemRenderer?: Props['itemRenderer']
  onChange: Props['onItemSelect']
  value?: string | null
  items: Props['items'] | (() => Promise<Props['items']>)
  /**
   * Delays calling the items promise function.
   * Instead of fetching items on mount, fetch whenever dropdown is opened OR there exists a selected item
   */
  lazyItems?: boolean
  usePortal?: boolean
  className?: string
  popoverClassName?: string
  minWidth?: StyledProps['width']
  width?: StyledProps['width']
  buttonTestId?: string
  isLabel?: boolean
  icon?: IconName
  iconProps?: Partial<IconProps>
  addClearBtn?: boolean
  placeholder?: string
  getCustomLabel?: (item: SelectOption) => string | ReactElement
}

function defaultItemRenderer(item: SelectOption, props: IItemRendererProps): JSX.Element | null {
  return (
    <li
      key={item.value.toString()}
      className={cx(css.menuItem, {
        [css.active]: props.modifiers.active,
        [css.disabled]: props.modifiers.disabled
      })}
      onClick={e => {
        if (!props.modifiers.disabled) {
          props.handleClick(e)
        }
      }}>
      {item.label}
    </li>
  )
}

export function NoMatch({ hasInternalQuery }: { hasInternalQuery: boolean }): ReactElement {
  return (
    <li className={cx(css.menuItem, css.disabled)}>
      {hasInternalQuery ? 'No matching results found' : 'No items found'}
    </li>
  )
}

export const DropDown: FC<DropDownProps> = props => {
  const {
    onChange,
    value,
    items,
    itemRenderer,
    className = '',
    popoverClassName = '',
    usePortal = false,
    filterable = true,
    placeholder = 'Select',
    minWidth = 130,
    width,
    buttonTestId = 'dropdown-button',
    icon,
    iconProps,
    isLabel,
    query,
    onQueryChange,
    addClearBtn = false,
    getCustomLabel,
    disabled,
    lazyItems,
    ...rest
  } = props

  const [dropDownItems, setDropDownItems] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [internalQuery, setInternalQuery] = useState<string>('')
  const [isDropdownOpenedOnce, setDropdownOpenedOnce] = useState(false)

  const activeItem = useMemo(
    () =>
      dropDownItems.find(item => item.value === value?.toString()) || {
        label: '',
        value: ''
      },
    [value, dropDownItems]
  )

  useEffect(() => {
    if (Array.isArray(items)) {
      setDropDownItems(items)
    } else if (typeof items === 'function') {
      // Do not enter this block if already loading
      if (loading) return
      // For lazy loaded queries call the items function once
      // defer the call until the dropdown is opened or there's already a previously selected item
      if (lazyItems && !(isDropdownOpenedOnce || value)) return

      setLoading(true)
      Promise.resolve(items())
        .then(itemsResponse => {
          setDropDownItems(itemsResponse)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [JSON.stringify(items), lazyItems, isDropdownOpenedOnce])

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
      renderedItems = <NoMatch hasInternalQuery={!!internalQuery} />
    }
    return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>
  }

  const isDisabled = (!lazyItems && internalQuery.length === 0 && dropDownItems.length === 0) || !!disabled
  const isSelected = !!activeItem?.value

  const debouncedQuery = useCallback(
    debounce(query => {
      if (Array.isArray(items)) {
        setDropDownItems(items.filter(item => item.label.toLowerCase().includes(query.toLowerCase())))
      } else if (typeof items === 'function') {
        onQueryChange?.(query)
      }
      setInternalQuery(query)
    }, 300),
    [setDropDownItems, onQueryChange, items, setInternalQuery]
  )

  return (
    <Select
      itemRenderer={(item: SelectOption, rendererProps: IItemRendererProps) =>
        itemRenderer?.(item, rendererProps) || defaultItemRenderer(item, rendererProps)
      }
      items={dropDownItems}
      onItemSelect={onChange}
      activeItem={activeItem}
      filterable={filterable}
      itemListRenderer={renderMenu}
      inputProps={{
        leftElement: <Icon name={'thinner-search'} size={12} color={Color.GREY_500} />,
        placeholder: 'Search'
      }}
      query={query}
      onQueryChange={debouncedQuery}
      popoverProps={{
        targetTagName: 'div',
        wrapperTagName: 'div',
        usePortal,
        minimal: true,
        position: Position.BOTTOM_LEFT,
        className: cx(css.main, { [css.disabled]: isDisabled }, className),
        popoverClassName: cx(css.popover, popoverClassName),
        onInteraction: isOpen => {
          if (isOpen) {
            setDropdownOpenedOnce(isOpen)
          }
        }
      }}
      {...rest}>
      <Layout.Horizontal
        data-testid={buttonTestId}
        style={width ? { width } : { minWidth }}
        className={cx(
          css.dropdownButton,
          { [css.withBorder]: !isLabel },
          { [css.selected]: isSelected && addClearBtn },
          { [css.minWidth]: !width }
        )}
        flex>
        <Layout.Horizontal className={css.labelWrapper} flex>
          {icon && <Icon name={icon} size={13} color={Color.GREY_600} {...iconProps} />}
          <Text data-testid="dropdown-value" className={css.label} lineClamp={1}>
            {activeItem && activeItem.value
              ? getCustomLabel
                ? getCustomLabel(activeItem)
                : activeItem.label
              : placeholder}
          </Text>
        </Layout.Horizontal>
        <Layout.Horizontal className={css.btnWrapper} flex>
          {isSelected && addClearBtn && (
            <Button
              icon={'main-delete'}
              iconProps={{ size: 14, color: Color.GREY_400 }}
              minimal
              withoutBoxShadow
              withoutCurrentColor={true}
              onClick={e => {
                e.stopPropagation()
                onChange({ label: '', value: '' })
              }}
            />
          )}
          <Icon name="main-chevron-down" size={8} color={Color.GREY_400} />
        </Layout.Horizontal>
      </Layout.Horizontal>
    </Select>
  )
}
