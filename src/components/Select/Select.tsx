/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import cx from 'classnames'
import { Position, Classes } from '@blueprintjs/core'
import { Suggest, ISuggestProps, IItemRendererProps } from '@blueprintjs/select'

import css from './Select.css'
import { Button } from '../../components/Button/Button'
import { Icon, IconProps } from '@harness/icons'
import { Utils } from '../../core/Utils'
import { Text } from '../../components/Text/Text'
import { Popover } from '../../components/Popover/Popover'

export interface SelectOption {
  label: string
  value: string | number | symbol
  icon?: IconProps
}

export enum SelectSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

type Props = ISuggestProps<SelectOption>

const Loading = Symbol('loading')

export interface SelectProps
  extends Omit<
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
  name?: string
  whenPopoverClosed?: (node: HTMLElement) => void
  addClearBtn?: boolean
  usePortal?: boolean
  popoverClassName?: string
  onQueryChange?: Props['onQueryChange']
  addTooltip?: boolean
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
        { [css.menuItemSizeLarge]: size === SelectSize.Large }
      )}
      onClick={props.handleClick}>
      {item.icon ? <Icon size={getIconSizeFromSelect(size)} {...item.icon} /> : null}
      <Text className={css.menuItemLabel} lineClamp={1}>
        {item.label}
      </Text>
    </li>
  )
}

export function createNewItemFromQuery(query: string): SelectOption {
  return { label: query, value: query }
}

export function Select(props: SelectProps): React.ReactElement {
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState(Array.isArray(props.items) ? props.items : [])
  const {
    onChange,
    value,
    size,
    itemRenderer,
    whenPopoverClosed,
    popoverClassName = '',
    resetOnSelect = true,
    resetOnClose = true,
    addTooltip = false,
    ...rest
  } = props
  const [item, setItem] = React.useState<SelectOption | undefined | null>(undefined)
  const [showClearBtn, setShowClearBtn] = useState<boolean>()

  React.useEffect(() => {
    setItem(value)
    if (props.addClearBtn && value?.value) {
      setShowClearBtn(true)
    } else {
      setShowClearBtn(false)
    }
  }, [value])

  function handleItemSelect(item: SelectOption) {
    if (item.value === Loading) {
      return
    }
    if (typeof onChange === 'function') {
      onChange(item)
    } else {
      setItem(item)
    }
    if (props.addClearBtn && item?.value) {
      setShowClearBtn(true)
    } else {
      setShowClearBtn(false)
    }
  }

  React.useEffect(() => {
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
    handleClick: React.MouseEventHandler<HTMLElement>
  ): JSX.Element | undefined {
    if (loading) {
      return (
        <li key="loading" className={cx(css.menuItem, css.loading)}>
          Loading results...
        </li>
      )
    }

    if (
      !loading &&
      props.allowCreatingNewItems &&
      items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase())).length === 0
    )
      return (
        <React.Fragment>
          <div className={css.noResultsFound}>Nothing Found</div>
          <Button
            intent="primary"
            minimal
            text={query}
            icon="plus"
            className={css.createNewItemButton}
            onClick={handleClick as React.MouseEventHandler<Element>}
          />
        </React.Fragment>
      )
  }
  const renderSuggestComponent = () => (
    <Suggest
      inputValueRenderer={opt => opt.label}
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
        onChange(e: React.ChangeEvent<HTMLInputElement>) {
          setQuery(e.target.value)
        },
        value: query,
        placeholder: Utils.getSelectComponentPlaceholder(rest?.inputProps?.placeholder),
        leftElement: item?.icon ? <Icon size={getIconSizeFromSelect(size)} {...item?.icon} /> : undefined,
        rightElement: (
          <>
            {!props.disabled && showClearBtn ? (
              <Icon
                name="main-delete"
                onClick={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
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
        ...props.inputProps
      }}
      resetOnSelect={resetOnSelect}
      resetOnClose={resetOnClose}
      items={loading ? [{ label: 'Loading...', value: Loading }] : items}
      selectedItem={item}
      onItemSelect={handleItemSelect}
      query={query}
      popoverProps={{
        targetTagName: 'div',
        wrapperTagName: 'div',
        fill: true,
        usePortal: !!props.usePortal,
        minimal: true,
        position: Position.BOTTOM_LEFT,
        className: css.main,
        popoverClassName: cx(css.popover, popoverClassName),
        onClosed: whenPopoverClosed
      }}
    />
  )
  const tooltipContent = item?.label ? (
    <div className={css.tooltipContainer} color="white">
      {item.label}
    </div>
  ) : (
    ''
  )
  return addTooltip ? (
    <Popover
      boundary="viewport"
      interactionKind="hover"
      content={tooltipContent}
      isDark={true}
      fill={true}
      popoverClassName={Classes.DARK}
      position="bottom">
      {renderSuggestComponent()}
    </Popover>
  ) : (
    renderSuggestComponent()
  )
}

export function NoMatch(): React.ReactElement {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}
