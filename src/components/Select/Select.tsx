import React from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { Suggest, ISuggestProps, IItemRendererProps } from '@blueprintjs/select'

import css from './Select.css'

export interface SelectOption {
  label: string
  value: string | number | symbol
}

type Props = ISuggestProps<SelectOption>

const Loading = Symbol('loading')

export interface SelectProps
  extends Omit<
    Props,
    'popoverProps' | 'inputValueRenderer' | 'itemRenderer' | 'onItemSelect' | 'query' | 'selectedItem' | 'items'
  > {
  inputValueRender?: Props['inputValueRenderer']
  itemRender?: Props['itemRenderer']
  onChange?: Props['onItemSelect']
  value?: Props['selectedItem']
  items: Props['items'] | (() => Promise<Props['items']>)
}

function itemRenderer(item: SelectOption, props: IItemRendererProps): JSX.Element | null {
  if (!props.modifiers.matchesPredicate) {
    return null
  }

  if (item.value === Loading) {
    return <li className={cx(css.menuItem, css.loading)}>Loading results...</li>
  }

  return (
    <li
      className={cx(css.menuItem, {
        [css.active]: props.modifiers.active,
        [css.disabled]: props.modifiers.disabled
      })}
      onClick={props.handleClick}>
      {item.label}
    </li>
  )
}

export function Select(props: SelectProps) {
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState(Array.isArray(props.items) ? props.items : [])
  const { onChange, value, ...rest } = props

  function handleItemSelect(item: SelectOption) {
    if (item.value === Loading) {
      return
    }

    setQuery(item.label)

    if (typeof onChange === 'function') {
      onChange(item)
    }
  }

  React.useEffect(() => {
    setQuery(value?.label ?? '')
  }, [value])

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

  return (
    <Suggest
      inputValueRenderer={opt => opt.label}
      inputProps={{
        onChange(e: React.ChangeEvent<HTMLInputElement>) {
          setQuery(e.target.value)
        },
        value: query
      }}
      itemRenderer={itemRenderer}
      itemListPredicate={(query, items) =>
        items.filter(item =>
          item.label
            .toString()
            .toLowerCase()
            .startsWith(query.toLowerCase())
        )
      }
      noResults={<NoMatch />}
      {...rest}
      items={loading ? [{ label: 'Loading...', value: Loading }] : items}
      selectedItem={value}
      onItemSelect={handleItemSelect}
      query={query}
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

export function NoMatch() {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}
