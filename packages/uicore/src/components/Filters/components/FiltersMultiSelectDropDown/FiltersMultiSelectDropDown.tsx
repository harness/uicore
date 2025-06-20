/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { Popover, Spinner, Menu, PopoverInteractionKind, Classes } from '@blueprintjs/core'
import {
  QueryList,
  IQueryListRendererProps,
  IItemRendererProps,
  IQueryListProps,
  ItemListRenderer
} from '@blueprintjs/select'

import css from './FiltersMultiSelectDropDown.css'
import { MultiSelectOption } from '../../../MultiSelect/MultiSelect'
import cx from 'classnames'
import { Layout } from '../../../../layouts/Layout'
import { Utils } from '../../../../core/Utils'
import { Icon, IconName, IconProps } from '@harness/icons'
import { Color, FontVariation, PopoverProps } from '@harness/design-system'
import { Text } from '../../../Text/Text'
import { StyledProps } from '@harness/design-system'
import { Checkbox } from '../../../Checkbox/Checkbox'
import { SelectOption } from '../../../Select/Select'
import {
  ExpandingSearchInputWithRef,
  ExpandingSearchInputProps
} from '../../../ExpandingSearchInput/ExpandingSearchInput'
import { Container } from '../../../Container/Container'

type Props = IQueryListProps<MultiSelectOption>

export function NoMatch(): React.ReactElement {
  return <li className={cx(css.menuItem, css.noResults)}>No matching results found</li>
}

export interface FilterMultiSelectDropDownProps
  extends Omit<Props, 'items' | 'selectedItems' | 'popoverProps' | 'renderer' | 'itemRenderer' | 'onItemSelect'> {
  onChange?(opts: MultiSelectOption[]): void
  value?: MultiSelectOption[]
  items: Props['items'] | (() => Promise<Props['items']>)
  usePortal?: boolean
  className?: string
  popoverClassName?: string
  width?: StyledProps['width']
  buttonTestId?: string
  isLabel?: boolean
  icon?: IconName
  iconProps?: Partial<IconProps>
  placeholder?: string
  hideItemCount?: boolean
  disabled?: boolean
  allowSearch?: boolean
  onRemove?: () => void
  onPopoverClose?(opts: MultiSelectOption[]): void
  expandingSearchInputProps?: ExpandingSearchInputProps
  showDropDownIcon?: boolean
  initialDropDownOpen?: boolean
  isLoading?: boolean
  tooltip?: string
  tooltipProps?: PopoverProps
  footer?: React.ReactNode
  listItemRenderer?: (item: MultiSelectOption, itemProps: IItemRendererProps) => JSX.Element | null
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
export function FiltersMultiSelectDropDown(props: FilterMultiSelectDropDownProps): React.ReactElement {
  const {
    onChange,
    value,
    items,
    className = '',
    popoverClassName = '',
    usePortal = false,
    placeholder = 'Select',
    width,
    onRemove,
    buttonTestId = 'multi-select-dropdown-button',
    icon,
    iconProps,
    isLabel,
    disabled,
    hideItemCount,
    allowSearch = false,
    onPopoverClose,
    expandingSearchInputProps,
    showDropDownIcon,
    initialDropDownOpen = false,
    isLoading = false,
    listItemRenderer,
    footer,
    ...rest
  } = props
  const [query, setQuery] = React.useState<string>('')
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectOption[]>([])
  const [dropDownItems, setDropDownItems] = React.useState<MultiSelectOption[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(initialDropDownOpen)

  useEffect(() => {
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

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedItems(value)
    }
  }, [value])

  const onSearchChange = useCallback(
    (newQuery: string) => {
      if (expandingSearchInputProps?.onChange) {
        expandingSearchInputProps.onChange(newQuery)
      }
      setQuery(newQuery)
    },
    [expandingSearchInputProps]
  )

  // to filter out the options based on search
  const filterItems = (itemsToRender: SelectOption[]) => {
    const searchValue = query.trim().toLocaleLowerCase()
    if (searchValue.length === 0) return itemsToRender
    return itemsToRender.filter(item => item.label.toLocaleLowerCase().includes(searchValue))
  }

  function handleClearSelection(): void {
    setSelectedItems([])
    onChange?.([])
  }

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
    if (loading || isLoading) {
      renderedItems = (
        <li className={css.menuItem} style={{ justifyContent: 'center' }}>
          <Spinner size={20} />
        </li>
      )
    } else if (itemsToRender.length > 0) {
      renderedItems = filterItems(itemsToRender)
        .map(renderItem)
        .filter(item => item !== null)
    } else {
      renderedItems = <NoMatch />
    }
    return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>
  }

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
        onClose={() => {
          expandingSearchInputProps?.onChange?.('')
          setQuery('')
          onPopoverClose?.(selectedItems)
        }}
        className={cx(css.main, { [css.disabled]: !!disabled }, className)}
        popoverClassName={cx(css.popover, popoverClassName)}
        isOpen={disabled ? false : isOpen}>
        <Utils.WrapOptionalTooltip tooltip={props.tooltip} tooltipProps={props.tooltipProps}>
          <Layout.Horizontal
            data-testid={buttonTestId}
            style={width ? { width } : undefined}
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
                <>
                  <div className={css.verticalDivider}></div>
                  <Popover
                    position="top"
                    usePortal={true}
                    interactionKind={PopoverInteractionKind.HOVER}
                    className={Classes.DARK}
                    content={
                      selectedItems.length > 0 ? (
                        <Container className={css.selectedItemsPopover}>
                          <Text color={Color.GREY_100} padding={'small'} font={{ variation: FontVariation.SMALL }}>
                            {selectedItems.map(item => item.label).join(', ')}
                          </Text>
                        </Container>
                      ) : (
                        <Text>No items selected</Text>
                      )
                    }>
                    <Text className={css.counter} lineClamp={1}>
                      {selectedItems.length <= 9 ? '0' : ''}
                      {selectedItems.length} selected
                    </Text>
                  </Popover>
                </>
              )}
            </Layout.Horizontal>
            <Icon
              name={showDropDownIcon ? 'main-chevron-down' : 'cross'}
              size={showDropDownIcon ? 8 : 12}
              className={css.crossIcon}
              color={Color.GREY_400}
              onClick={e => {
                if (!showDropDownIcon && !disabled) {
                  e.stopPropagation()
                  onRemove?.()
                }
              }}
            />
          </Layout.Horizontal>
        </Utils.WrapOptionalTooltip>
        <React.Fragment>
          {allowSearch && (
            <ExpandingSearchInputWithRef
              alwaysExpanded
              {...expandingSearchInputProps}
              onChange={onSearchChange}
              value={query}
            />
          )}
          {listProps.itemList
            ? React.cloneElement(listProps.itemList as React.ReactElement, {
                className: css.menu
              })
            : null}
          {footer}
          <Container className={css.clearSelection} onClick={handleClearSelection}>
            <Text font={{ variation: FontVariation.SMALL }} color={Color.GREY_600}>
              Clear Selection
            </Text>
          </Container>
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
          [css.active]: isSelected
        })}
        onClick={e => {
          if (!modifiers.disabled && !item.disabled) {
            handleClick(e)
          }
        }}
        checked={isSelected}
        labelElement={
          <Text lineClamp={1} font={{ variation: FontVariation.SMALL }}>
            {item.label}
          </Text>
        }
      />
    )
  }

  // This logic was picked from MultiSelectDropDown.tsx

  return (
    <QueryList
      items={dropDownItems}
      itemListRenderer={renderMenu}
      renderer={renderer}
      itemRenderer={listItemRenderer ? listItemRenderer : itemRenderer}
      onItemSelect={handleItemSelect}
      {...rest}
    />
  )
}
