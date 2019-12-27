import React from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { MultiSelect as BPMultiSelect, IMultiSelectProps, IItemRendererProps } from '@blueprintjs/select'

import css from './MultiSelect.css'

export interface MultiSelectOption {
  label: string
  value: string | number | symbol
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
    | 'query'
    | 'items'
    | 'tagRenderer'
    | 'tagInputProps'
    | 'activeItem'
    | 'onActiveItemChange'
  > {
  itemRender?: Props['itemRenderer']
  onChange?(opts: MultiSelectOption[]): void
  value?: MultiSelectOption[]
  items: Props['items'] | (() => Promise<Props['items']>)
  tagRenderer?: Props['tagRenderer']
}

export function NoMatch() {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}

export function MultiSelect(props: MultiSelectProps) {
  const { onChange, value, items: _items, ...rest } = props
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState<MultiSelectOption[]>(Array.isArray(_items) ? _items : [])
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectOption[]>(Array.isArray(value) ? value : [])

  function handleItemSelect(item: MultiSelectOption) {
    if (item.value === Loading) {
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
          [css.disabled]: rendererProps.modifiers.disabled
        })}
        onClick={rendererProps.handleClick}>
        <input
          className={css.checkbox}
          type="checkbox"
          value={item.value.toString()}
          checked={value && value.findIndex(val => val.value === item.value) > -1}
          readOnly
        />
        {item.label}
      </li>
    )
  }

  return (
    <BPMultiSelect
      itemRenderer={itemRenderer}
      tagRenderer={item => item.label}
      itemsEqual={(a, b) => a.value === b.value}
      {...rest}
      tagInputProps={{
        inputProps: {
          onChange: handleQueryChange
        },
        tagProps: {
          className: css.tag
        },
        onRemove(value) {
          const option = selectedItems.find(opt => opt.label === value)

          if (option) {
            handleItemSelect(option)
          }
        }
      }}
      itemListPredicate={(query, items) =>
        items.filter(item =>
          item.label
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
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
        popoverClassName: css.popover
      }}
    />
  )
}
