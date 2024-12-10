/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  ReactElement,
  MouseEvent,
  useCallback
} from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { Suggest, ISuggestProps, IItemRendererProps } from '@blueprintjs/select'

import css from './Select.css'
import { Button } from '../../components/Button/Button'
import { Icon, IconProps } from '@harness/icons'
import { Utils } from '../../core/Utils'
import { Text } from '../../components/Text/Text'
import { OptionalTooltip } from '@harness/design-system'

export interface SelectOption {
  label: string
  value: string | number | symbol
  icon?: IconProps
  rightIcon?: IconProps
}

export enum SelectSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

type Props = ISuggestProps<SelectOption>

const Loading = Symbol('loading')

export const LoadingSelectOption: SelectOption = { label: 'Loading...', value: Loading }

export interface SelectProps
  extends OptionalTooltip,
    Omit<
      Props,
      | 'popoverProps'
      | 'inputValueRenderer'
      | 'itemRenderer'
      | 'onItemSelect'
      | 'query'
      | 'selectedItem'
      | 'items'
      | 'activeItem'
      | 'onActiveItemChange'
    > {
  inputValueRender?: Props['inputValueRenderer']
  itemRenderer?: Props['itemRenderer']
  onChange?: Props['onItemSelect']
  value?: Props['selectedItem']
  size?: SelectSize
  items: Props['items'] | (() => Promise<Props['items']>)
  allowCreatingNewItems?: boolean
  newItemRenderer?: (query: string, clickHandler?: MouseEventHandler<Element>) => ReactNode
  name?: string
  whenPopoverClosed?: (node: HTMLElement) => void
  addClearBtn?: boolean
  usePortal?: boolean
  popoverClassName?: string
  onQueryChange?: Props['onQueryChange']
  addTooltip?: boolean
  borderless?: boolean
  loadingItems?: boolean
}

function getIconSizeFromSelect(size: SelectSize = SelectSize.Medium) {
  let iconSize = 16
  if (size === SelectSize.Small) {
    iconSize = 12
  } else if (size === SelectSize.Large) {
    iconSize = 18
  }
  return iconSize
}

export function defaultItemRenderer(
  item: SelectOption,
  props: IItemRendererProps,
  size: SelectSize = SelectSize.Medium
): JSX.Element | null {
  if (!props.modifiers.matchesPredicate) {
    return null
  }

  if (item.value === Loading) {
    return (
      <li key="loading" className={cx(css.menuItem, css.loading)}>
        Loading results...
      </li>
    )
  }

  return (
    <li
      key={item.value.toString()}
      className={cx(
        css.menuItem,
        {
          [css.active]: props.modifiers.active,
          [css.disabled]: props.modifiers.disabled
        },
        { [css.menuItemSizeSmall]: size === SelectSize.Small },
        { [css.menuItemSizeLarge]: size === SelectSize.Large },
        { [css.rightIcon]: item.rightIcon }
      )}
      onClick={props.handleClick}>
      {item.icon ? <Icon size={getIconSizeFromSelect(size)} {...item.icon} /> : null}
      <Text className={css.menuItemLabel} lineClamp={1}>
        {item.label}
      </Text>
      {item.rightIcon ? <Icon size={getIconSizeFromSelect(size)} {...item.rightIcon} /> : null}
    </li>
  )
}

export function createNewItemFromQuery(query: string): SelectOption {
  return { label: query, value: query }
}

export function Select(props: SelectProps): ReactElement {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState(Array.isArray(props.items) ? props.items : [])
  const {
    onChange,
    value,
    size,
    itemRenderer,
    addClearBtn,
    whenPopoverClosed,
    popoverClassName = '',
    resetOnSelect = true,
    resetOnClose = true,
    addTooltip = false,
    borderless = false,
    loadingItems,
    tooltipProps,
    ...rest
  } = props
  const [selectedItem, setSelectedItem] = useState<SelectOption | undefined | null>(undefined)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [tooltip, setTooltip] = useState<OptionalTooltip['tooltip']>()

  const showClearBtn =
    !!addClearBtn &&
    value !== null &&
    value !== undefined &&
    (value as any) !== '' &&
    value?.value !== undefined &&
    value?.value !== null &&
    value?.value !== ''

  useEffect(() => {
    setSelectedItem(value)
  }, [value])

  function handleItemSelect(item: SelectOption) {
    if (item.value === Loading) {
      return
    }
    if (typeof onChange === 'function') {
      onChange(item)
    }

    setIsScrollable(false)
    setSelectedItem(item)
  }

  function onPopoverClosed(node: HTMLElement): void {
    whenPopoverClosed?.(node)

    if (inputRef.current) {
      const element = inputRef.current
      const widthDifference = (element.scrollWidth || 0) - (element.offsetWidth || 0)

      setIsScrollable(widthDifference > 1)
    } else {
      setIsScrollable(false)
    }
  }

  useEffect(() => {
    if (Array.isArray(props.items)) {
      setItems(props.items)
    } else if (typeof props.items === 'function') {
      setLoading(true)
      const promise = props.items()

      if (typeof promise.then === 'function') {
        promise.then(results => {
          setItems(results)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
  }, [props.items])

  function createNewItemRenderer(
    query: string,
    _active: boolean,
    handleClick: MouseEventHandler<HTMLElement>
  ): JSX.Element | undefined {
    if (loading || loadingItems) {
      return (
        <li key="loading" className={cx(css.menuItem, css.loading)}>
          Loading results...
        </li>
      )
    }

    const isExactQueryElPresent = items.some(item => item.label === query)
    if (!loading)
      return (
        <>
          {items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase())).length === 0 ? (
            <div className={css.noResultsFound}>No Match Found</div>
          ) : null}
          {props.allowCreatingNewItems && !isExactQueryElPresent ? (
            props.newItemRenderer ? (
              props.newItemRenderer?.(query, handleClick)
            ) : (
              <Button
                intent="primary"
                minimal
                text={query}
                icon="plus"
                className={css.createNewItemButton}
                onClick={handleClick as MouseEventHandler<Element>}
              />
            )
          ) : null}
        </>
      )
  }

  const inputRefCallback = useCallback((el: HTMLInputElement | null) => {
    inputRef.current = el
  }, [])

  useEffect(() => {
    if (addTooltip) {
      if (props.tooltip) {
        setTooltip(props.tooltip)
      } else if (isScrollable) {
        setTooltip(selectedItem?.label ?? '')
      } else {
        setTooltip(undefined)
      }
    } else {
      setTooltip(undefined)
    }
  }, [addTooltip, isScrollable, selectedItem?.label])

  const renderSuggestComponent = () => (
    <Suggest
      inputValueRenderer={opt => opt.label?.toString()}
      itemRenderer={(item: SelectOption, props: IItemRendererProps) =>
        itemRenderer?.(item, props) || defaultItemRenderer(item, props, size)
      }
      itemListPredicate={(query, items) =>
        items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase()))
      }
      createNewItemFromQuery={props.createNewItemFromQuery || createNewItemFromQuery}
      createNewItemRenderer={props.createNewItemRenderer || createNewItemRenderer}
      noResults={<NoMatch />}
      {...rest}
      inputProps={{
        onChange(e: ChangeEvent<HTMLInputElement>) {
          setQuery(e.target.value)
        },
        value: query,
        placeholder: Utils.getSelectComponentPlaceholder(rest?.inputProps?.placeholder),
        leftElement: selectedItem?.icon ? (
          <Icon size={getIconSizeFromSelect(size)} {...selectedItem?.icon} />
        ) : undefined,
        rightElement: (
          <>
            {!props.disabled && showClearBtn ? (
              <Icon
                name="main-delete"
                onClick={(e: MouseEvent<HTMLSpanElement>) => {
                  e.preventDefault()
                  handleItemSelect({ value: '', label: '' })
                }}
                size={14}
                padding={{ top: 'small', right: 'xsmall', bottom: 'small' }}
              />
            ) : null}
            <Icon
              name={'chevron-down'}
              onClick={e => {
                const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement
                input?.focus()
              }}
              size={14}
              padding={size === SelectSize.Small ? 'xsmall' : 'small'}
            />
          </>
        ),
        small: size === SelectSize.Small,
        large: size === SelectSize.Large,
        name: props.name,
        inputRef: inputRefCallback,
        ...props.inputProps
      }}
      resetOnSelect={resetOnSelect}
      resetOnClose={resetOnClose}
      items={loading ? [LoadingSelectOption] : items}
      selectedItem={selectedItem}
      onItemSelect={handleItemSelect}
      query={query}
      popoverProps={{
        targetTagName: 'div',
        fill: true,
        usePortal: !!props.usePortal,
        minimal: true,
        position: Position.BOTTOM_LEFT,
        className: cx(css.main, { [css.borderless]: borderless }),
        popoverClassName: cx(css.popover, popoverClassName),
        onClosed: onPopoverClosed,
        modifiers: {
          preventOverflow: {
            // This is required to always attach the portal to the start of the reference instead of the middle
            escapeWithReference: !!props.usePortal
          },
          offset: {
            // This is required to offset the portal after it is attached to the reference.
            // By default the portal is positioned at top: 0, left:0 wrt it's reference
            offset: props.usePortal ? '1 2' : 0
          }
        }
      }}
    />
  )

  return (
    <Utils.WrapOptionalTooltip
      tooltip={tooltip}
      tooltipProps={{
        ...tooltipProps,
        targetTagName: tooltipProps?.targetTagName || 'div',
        position: tooltipProps?.position || 'bottom',
        targetClassName: cx(tooltipProps?.targetClassName)
      }}>
      {renderSuggestComponent()}
    </Utils.WrapOptionalTooltip>
  )
}

export function NoMatch(): ReactElement {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}
