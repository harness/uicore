/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactElement } from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { MultiSelect as BPMultiSelect, IMultiSelectProps, IItemRendererProps } from '@blueprintjs/select'

import css from './MultiSelect.css'
import { Button } from '../../components/Button/Button'
import { Text } from '../../components/Text/Text'
import { Icon } from '@harness/icons'
import { Utils } from '../../core/Utils'

export interface MultiSelectOption {
  label: string
  value: string | number | symbol
  disabled?: boolean
}

type Props = IMultiSelectProps<MultiSelectOption>

const Loading = Symbol('loading')

export interface MultiSelectProps
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
  itemRender?: Props['itemRenderer']
  onChange?(opts: MultiSelectOption[]): void
  value?: MultiSelectOption[]
  items: Props['items'] | (() => Promise<Props['items']>)
  tagRenderer?: Props['tagRenderer']
  createNewItemFromQuery?: Props['createNewItemFromQuery']
  allowCreatingNewItems?: boolean
  name?: string
  onPopoverClose?: (node: HTMLElement) => void
  disabled?: boolean
}

export function NoMatch(): React.ReactElement {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}

export function MultiSelect(props: MultiSelectProps): React.ReactElement {
  const { onChange, value, items: _items, onPopoverClose, disabled, ...rest } = props
  const [query, setQuery] = React.useState(props.query || '')
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState<MultiSelectOption[]>(Array.isArray(_items) ? _items : [])
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectOption[]>(Array.isArray(value) ? value : [])
  const valuesMap: Record<string, boolean> = React.useMemo(
    () => (value || []).reduce((acc, current) => ({ ...acc, [current.label]: !!current.disabled }), {}),
    [value]
  )

  function handleItemSelect(item: MultiSelectOption) {
    if (item.value === Loading || item.disabled) {
      return
    }

    if (typeof onChange === 'function') {
      const index = selectedItems.findIndex(opt => opt.value === item.value)

      if (index < 0) {
        onChange(selectedItems.concat(item))
        setQuery('')
      } else {
        onChange(selectedItems.filter((_, i) => i !== index))
      }
    }
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setQuery(value)
  }

  React.useEffect(() => {
    if (Array.isArray(_items)) {
      setItems(_items)
    } else if (typeof _items === 'function') {
      setLoading(true)
      const promise = _items()

      if (typeof promise.then === 'function') {
        promise.then(results => {
          setItems(results)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
  }, [_items])

  React.useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedItems(value)
    }
  }, [value])

  React.useEffect(() => {
    setQuery(props.query || '')
  }, [props.query])

  function itemRenderer(item: MultiSelectOption, rendererProps: IItemRendererProps): JSX.Element | null {
    if (!rendererProps.modifiers.matchesPredicate) {
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
        className={cx(css.menuItem, {
          [css.active]: rendererProps.modifiers.active,
          [css.disabled]: rendererProps.modifiers.disabled || item.disabled
        })}
        onClick={rendererProps.handleClick}>
        <input
          className={css.checkbox}
          type="checkbox"
          value={item.value.toString()}
          checked={value && value.findIndex(val => val.value === item.value) > -1}
          disabled={item.disabled}
          readOnly
        />
        <Text className={css.menuItemLabel} lineClamp={1}>
          {item.label}
        </Text>
      </li>
    )
  }

  function createNewItemFromQuery(query: string) {
    return { label: query, value: query }
  }

  function tagRenderer(item: MultiSelectOption) {
    return item.label
  }

  function createNewItemRenderer(query: string, _active: boolean, handleClick: any) {
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
      items.filter(item => item.label.toString().toLowerCase() === query.toLowerCase()).length === 0
    )
      return (
        <React.Fragment>
          <Button intent="primary" minimal text={query} icon="plus" onClick={handleClick} />
          <span className="icon-container">
            <Icon id="icon-styled-props" name="info-sign" size={16} color="grey400" padding="small" />
          </span>
        </React.Fragment>
      )
  }

  return (
    <BPMultiSelect
      itemRenderer={props.itemRender || itemRenderer}
      createNewItemFromQuery={props.createNewItemFromQuery || createNewItemFromQuery}
      createNewItemRenderer={props.createNewItemRenderer || createNewItemRenderer}
      tagRenderer={props.tagRenderer || tagRenderer}
      itemsEqual={(a, b) => a.value === b.value}
      {...rest}
      tagInputProps={{
        disabled,
        placeholder: Utils.getSelectComponentPlaceholder(rest?.placeholder),
        inputProps: {
          ...props.tagInputProps?.inputProps,
          onChange: handleQueryChange,
          name: props.name,
          disabled
        },
        tagProps: value => {
          return {
            className: cx(css.tag, {
              [css.tagDisabled]: typeof value === 'string' && valuesMap[value]
            })
          }
        },
        onRemove(value: React.ReactNode) {
          const option = selectedItems.find(opt => {
            if (typeof value === 'string') return opt.label === value
            else return opt.value === (value as ReactElement).key
          })
          if (option) {
            handleItemSelect(option)
          }
        },
        ...props.tagInputProps
      }}
      itemListPredicate={(query, items) =>
        items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase()))
      }
      items={loading ? [{ label: 'Loading...', value: Loading }] : items}
      selectedItems={value}
      onItemSelect={handleItemSelect}
      query={query}
      noResults={<NoMatch />}
      popoverProps={{
        targetTagName: 'div',
        wrapperTagName: 'div',
        fill: true,
        usePortal: false,
        minimal: true,
        position: Position.BOTTOM_LEFT,
        className: css.main,
        popoverClassName: css.popover,
        onClosed: onPopoverClose
      }}
    />
  )
}
