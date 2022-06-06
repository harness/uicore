/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { Select, ISelectProps } from '@blueprintjs/select'
import { SelectOption, defaultItemRenderer, NoMatch, createNewItemFromQuery } from './Select'
import css from './SelectV2.css'
import { Button } from '../Button/Button'
import { Icon } from '@harness/icons'

const SelectBp = Select.ofType<SelectOption>()

type Props = ISelectProps<SelectOption>

const Loading = Symbol('loading')

export interface SelectV2Props
  extends Omit<Props, 'popoverProps' | 'itemRenderer' | 'onItemSelect' | 'query' | 'items'> {
  itemRenderer?: Props['itemRenderer']
  onChange?: Props['onItemSelect']
  value?: SelectOption
  placeholder?: string
  items: Props['items'] | (() => Promise<Props['items']>)
  children?: React.ReactNode
  allowCreatingNewItems?: boolean
}

export function SelectV2(props: SelectV2Props): React.ReactElement {
  const { onChange, ...rest } = props
  const [loading, setLoading] = React.useState(false)
  const [items, setItems] = React.useState(Array.isArray(props.items) ? props.items : [])

  function handleItemSelect(item: SelectOption) {
    if (item?.value === Loading) {
      return
    }
    if (typeof onChange === 'function') {
      onChange(item)
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
    <SelectBp
      itemRenderer={props.itemRenderer || defaultItemRenderer}
      itemListPredicate={(query, items) =>
        items.filter(item => item.label.toString().toLowerCase().includes(query.toLowerCase()))
      }
      createNewItemFromQuery={props.createNewItemFromQuery || createNewItemFromQuery}
      createNewItemRenderer={props.createNewItemRenderer || createNewItemRenderer}
      noResults={<NoMatch />}
      filterable={true}
      resetOnSelect={true}
      resetOnClose={true}
      inputProps={{
        placeholder: `- ${props.placeholder || 'Select'} -`
      }}
      {...rest}
      items={loading ? [{ label: 'Loading...', value: Loading }] : items}
      onItemSelect={handleItemSelect}
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
      activeItem={null}>
      {props.children}
    </SelectBp>
  )
}
