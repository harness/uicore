/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { Popover, Spinner, Menu, MenuDivider } from '@blueprintjs/core'
import { Utils } from '../../../../core/Utils'
import {
  QueryList,
  IQueryListRendererProps,
  IItemRendererProps,
  IQueryListProps,
  ItemListRenderer
} from '@blueprintjs/select'

import css from './FiltersSelectDropDown.css'
import cx from 'classnames'
import { Layout } from '../../../../layouts/Layout'
import { Icon, IconName, IconProps } from '@harness/icons'
import { Color, FontVariation } from '@harness/design-system'
import { Text } from '../../../Text/Text'
import { StyledProps } from '@harness/design-system'
import { SelectOption } from '../../../Select/Select'
import {
  ExpandingSearchInputWithRef,
  ExpandingSearchInputProps
} from '../../../ExpandingSearchInput/ExpandingSearchInput'
import { Container } from '../../../Container/Container'
import { PopoverProps } from '../../../Popover/Popover'

type Props = IQueryListProps<SelectOption>

export function NoMatch(): React.ReactElement {
  return <li className={cx(css.menuItem, css.noResultsFound)}>No matching results found</li>
}

export interface Section {
  [key: string]: string[]
}

export interface FilterSelectDropDownProps
  extends Omit<Props, 'items' | 'selectedItems' | 'popoverProps' | 'renderer' | 'itemRenderer' | 'onItemSelect'> {
  onChange?(opts: SelectOption): void
  value?: SelectOption
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
  allowSearch?: boolean
  onRemove?: () => void
  onPopoverClose?(opts: SelectOption): void
  expandingSearchInputProps?: ExpandingSearchInputProps
  customPlaceholderRenderer?: () => React.ReactElement
  showDropDownIcon?: boolean
  allowClearSelection?: boolean
  initialDropDownOpen?: boolean
  isLoading?: boolean
  tooltip?: string
  tooltipProps?: PopoverProps
  sections?: Section
  isHorizontalLayout?: boolean
  columnSplitIndex?: number
  listItemRenderer?: (item: SelectOption, itemProps: IItemRendererProps) => JSX.Element | null
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
export function FiltersSelectDropDown(props: FilterSelectDropDownProps): React.ReactElement {
  const {
    value,
    items,
    onChange,
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
    hideItemCount,
    allowSearch = false,
    onPopoverClose,
    customPlaceholderRenderer,
    expandingSearchInputProps,
    showDropDownIcon,
    allowClearSelection,
    initialDropDownOpen = false,
    isLoading,
    sections,
    listItemRenderer,
    ...rest
  } = props
  const [query, setQuery] = React.useState<string>('')
  const [selectedItem, setSelectedItem] = React.useState<SelectOption>({ label: '', value: '' })
  const [dropDownItems, setDropDownItems] = React.useState<SelectOption[]>([])
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
    if (value !== undefined) setSelectedItem(value)
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

  function handleItemSelect(item: SelectOption): void {
    setSelectedItem(item)
    onChange?.(item)
    setQuery('')
  }

  function handleClearSelection() {
    setSelectedItem({ label: '', value: '' })
    onChange?.({ label: '', value: '' })
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
      const filteredItems = filterItems(itemsToRender)

      if (sections) {
        renderedItems = Object.keys(sections).map((sectionTitle, index) => {
          const sectionItems = sections[sectionTitle]
          const sectionFilteredItems = filteredItems.filter(item => sectionItems.includes(item.value as string))

          return sectionFilteredItems.length > 0 ? (
            <React.Fragment key={index}>
              <MenuDivider title={sectionTitle} className={css.sectionTitle} />
              {sectionFilteredItems.map(renderItem)}
            </React.Fragment>
          ) : null
        })

        // Render items not in any section
        const uncategorizedItems = filteredItems.filter(
          item => !Object.values(sections).some(sectionItems => sectionItems.includes(item.value as string))
        )

        if (uncategorizedItems.length > 0) {
          renderedItems.push(<React.Fragment key="uncategorized">{uncategorizedItems.map(renderItem)}</React.Fragment>)
        }
      } else {
        renderedItems = filteredItems.map(renderItem)
      }

      renderedItems = renderedItems.filter(item => item !== null)
    } else {
      renderedItems = <NoMatch />
    }

    return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>
  }

  function renderer(listProps: IQueryListRendererProps<SelectOption>): JSX.Element {
    const midPoint = props.columnSplitIndex || 0

    const getAllMenuItems = (children: React.ReactNode): React.ReactNode[] => {
      return React.Children.toArray(children).reduce((acc: React.ReactNode[], child) => {
        if (React.isValidElement(child)) {
          if (child.type === React.Fragment) {
            // If it's a Fragment, recursively get its children
            return [...acc, ...getAllMenuItems(child.props.children)]
          }
          // If it's a menu item (not a divider)
          if (!child.props.className?.includes('bp4-menu-divider')) {
            return [...acc, child]
          }
        }
        return acc
      }, [])
    }

    const menuItems = getAllMenuItems((listProps.itemList as React.ReactElement).props.children)

    // Create column structure
    const modifiedItemList = (
      <div className={css.horizontalMenuWrapper}>
        <div className={css.firstColumn}>{menuItems.slice(0, midPoint)}</div>
        <div className={css.secondColumn}>{menuItems.slice(midPoint)}</div>
      </div>
    )

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
          setIsOpen(false)
          onPopoverClose?.(selectedItem)
          expandingSearchInputProps?.onChange?.('')
          setQuery('')
        }}
        className={cx(css.main, className)}
        popoverClassName={cx(css.popover, { [css.horizontalPopover]: props.isHorizontalLayout }, popoverClassName)}
        isOpen={!props.disabled ? isOpen : false}>
        {customPlaceholderRenderer ? (
          <div onClick={() => setIsOpen(true)}>{customPlaceholderRenderer()}</div>
        ) : (
          <Utils.WrapOptionalTooltip tooltip={props.tooltip} tooltipProps={props.tooltipProps}>
            <Layout.Horizontal
              data-testid={buttonTestId}
              style={width ? { width } : undefined}
              className={cx(
                css.dropdownButton,
                { [css.withBorder]: !isLabel },
                { [css.selected]: !!selectedItem },
                { [css.minWidth]: !width },
                { [css.disabled]: props.disabled }
              )}
              onClick={() => setIsOpen(true)}
              flex>
              <>
                <Layout.Horizontal className={css.labelWrapper} flex>
                  {icon && <Icon name={icon} size={13} color={Color.GREY_600} {...iconProps} />}
                  <Text data-testid="dropdown-value" className={css.label} lineClamp={1}>
                    {placeholder}
                  </Text>
                  {!hideItemCount && selectedItem.value !== '' && (
                    <>
                      <div className={css.verticalDivider}></div>
                      <Text className={css.counter} lineClamp={1}>
                        {selectedItem.label}
                      </Text>
                    </>
                  )}
                </Layout.Horizontal>

                <Icon
                  name={showDropDownIcon ? 'main-chevron-down' : 'cross'}
                  size={showDropDownIcon ? 8 : 12}
                  className={css.crossIcon}
                  color={Color.GREY_400}
                  onClick={e => {
                    if (!showDropDownIcon) {
                      e.stopPropagation()
                      onRemove?.()
                    }
                  }}
                />
              </>
            </Layout.Horizontal>
          </Utils.WrapOptionalTooltip>
        )}
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
                className: css.menu,
                onClick: () => setIsOpen(false),
                children:
                  props.isHorizontalLayout && midPoint && menuItems.length > midPoint
                    ? modifiedItemList
                    : listProps.itemList
              })
            : null}
          {allowClearSelection ? (
            <Container className={css.clearSelection} onClick={handleClearSelection}>
              <Text font={{ variation: FontVariation.SMALL }} color={Color.GREY_600}>
                Clear Selection
              </Text>
            </Container>
          ) : null}
        </React.Fragment>
      </Popover>
    )
  }

  function itemRenderer(item: SelectOption, itemProps: IItemRendererProps): JSX.Element | null {
    const { handleClick, modifiers } = itemProps
    return (
      <div
        key={item.value.toString()}
        className={cx(css.menuItem, { [css.active]: item.value === selectedItem.value })}
        onClick={e => {
          if (!modifiers.disabled) {
            handleClick(e)
          }
        }}>
        {
          <Text
            lineClamp={1}
            font={{ variation: FontVariation.SMALL }}
            color={item.value === selectedItem.value ? Color.WHITE : Color.BLACK}>
            {item.label}
          </Text>
        }
      </div>
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
