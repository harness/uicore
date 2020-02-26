import React from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { Suggest, ISuggestProps, IItemRendererProps } from '@blueprintjs/select'

import css from './Select.css'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../icons/Icon'

export interface SelectOption {
  label: string
  value: string | number | symbol
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
    | 'inputProps'
  > {
  inputValueRender?: Props['inputValueRenderer']
  itemRender?: Props['itemRenderer']
  onChange?: Props['onItemSelect']
  value?: Props['selectedItem']
  items: Props['items'] | (() => Promise<Props['items']>)
  allowCreatingNewItems?: boolean
}

function itemRenderer(item: SelectOption, props: IItemRendererProps): JSX.Element | null {
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

  function createNewItemFromQuery(query: string) {
    return { label: query, value: query }
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
    <Suggest
      inputValueRenderer={opt => opt.label}
      itemRenderer={itemRenderer}
      itemListPredicate={(query, items) =>
        items.filter(item =>
          item.label
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      }
      createNewItemFromQuery={props.createNewItemFromQuery || createNewItemFromQuery}
      createNewItemRenderer={props.createNewItemRenderer || createNewItemRenderer}
      noResults={<NoMatch />}
      {...rest}
      inputProps={{
        onChange(e: React.ChangeEvent<HTMLInputElement>) {
          setQuery(e.target.value)
        },
        value: query
      }}
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
