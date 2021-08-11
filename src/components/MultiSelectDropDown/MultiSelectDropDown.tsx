import React, { useState } from 'react'
import { Popover, Spinner, Menu } from '@blueprintjs/core'
import {
  QueryList,
  IQueryListRendererProps,
  IItemRendererProps,
  IQueryListProps,
  ItemListRenderer
} from '@blueprintjs/select'

import css from './MultiSelectDropDown.css'
import { MultiSelectOption } from '../MultiSelect/MultiSelect'
import cx from 'classnames'
import { Layout } from '../../layouts/Layout'
import { Icon, IconName } from '../../icons/Icon'
import { Color } from '../../core/Color'
import { Text } from '../Text/Text'
import { StyledProps } from '../../styled-props/StyledProps'
import { Checkbox } from '../Checkbox/Checkbox'
import { SelectOption } from '../Select/Select'
import { NoMatch } from '../DropDown/DropDown'

type Props = IQueryListProps<MultiSelectOption>

export interface MultiSelectDropDownProps extends Omit<Props, 'items' | 'selectedItems' | 'popoverProps'> {
  value?: MultiSelectOption[]
  items: Props['items'] | (() => Promise<Props['items']>)
  onChange?(opts: MultiSelectOption[]): void
  isLabel?: boolean
  labelIcon?: IconName
  minWidth?: StyledProps['width']
  placeholder?: string
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
export function MultiSelectDropDown(props: MultiSelectDropDownProps): React.ReactElement {
  const { items, value, onChange, placeholder = 'Select', isLabel, labelIcon, minWidth } = props
  const [selectedItems, setSelectedItems] = React.useState<MultiSelectOption[]>([])
  const [dropDownItems, setDropDownItems] = React.useState<MultiSelectOption[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedItems(value)
    }
  }, [value])

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
    if (loading) {
      renderedItems = (
        <li className={css.menuItem} style={{ justifyContent: 'center' }}>
          <Spinner size={20} />
        </li>
      )
    } else if (itemsToRender.length > 0) {
      renderedItems = itemsToRender.map(renderItem).filter(item => item !== null)
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
        minimal
        hasBackdrop
        backdropProps={{ onClick: () => setIsOpen(false) }}
        autoFocus={false}
        enforceFocus={false}
        className={css.main}
        popoverClassName={css.popover}
        isOpen={isOpen}>
        <Layout.Horizontal
          style={{ minWidth }}
          className={cx(
            css.dropdownButton,
            css.rightElement,
            { [css.withoutBorder]: isLabel },
            { [css.selected]: selectedItems.length > 0 }
          )}
          onClick={() => setIsOpen(true)}
          flex>
          <Layout.Horizontal className={css.labelWrapper} flex>
            {labelIcon && <Icon name={labelIcon} size={13} color={Color.GREY_600} />}
            <Text data-testid="dropdown-value" className={css.label}>
              {placeholder}
            </Text>
            {selectedItems.length > 0 && (
              <Text className={css.counter}>
                {selectedItems.length <= 9 ? '0' : ''}
                {selectedItems.length}
              </Text>
            )}
          </Layout.Horizontal>
          <Icon name="main-chevron-down" size={8} color={Color.GREY_400} />
        </Layout.Horizontal>
        <React.Fragment>
          {listProps.itemList
            ? React.cloneElement(listProps.itemList as React.ReactElement, {
                className: css.menu
              })
            : null}
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
          [css.active]: isSelected,
          [css.disabled]: modifiers.disabled || item.disabled
        })}
        onClick={handleClick}
        checked={isSelected}
        label={item.label}
      />
    )
  }

  return (
    <QueryList
      items={dropDownItems}
      itemListRenderer={renderMenu}
      renderer={renderer}
      itemRenderer={itemRenderer}
      onItemSelect={handleItemSelect}
    />
  )
}
