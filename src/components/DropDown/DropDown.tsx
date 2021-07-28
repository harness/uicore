import React from 'react'
import { Select as BPSelect, ISelectProps, IItemRendererProps, ItemListRenderer } from '@blueprintjs/select'
import { Button } from '../Button/Button'
import { Color } from '../../core/Color'
import { Layout } from '../../layouts/Layout'
import css from './DropDown.css'
import { SelectOption } from '../Select/Select'
import { Icon, IconName } from '../../icons/Icon'
import { Text } from '../Text/Text'
import cx from 'classnames'
import { Menu, Position, Spinner } from '@blueprintjs/core'
import { StyledProps } from '../../styled-props/StyledProps'
import { debounce } from 'lodash-es'

const Select = BPSelect.ofType<SelectOption>()

type Props = ISelectProps<SelectOption>

export interface DropDownProps
  extends Omit<
    Props,
    'popoverProps' | 'itemRenderer' | 'onItemSelect' | 'items' | 'activeItem' | 'onActiveItemChange'
  > {
  itemRenderer?: Props['itemRenderer']
  onChange: Props['onItemSelect']
  value?: string | null
  items: Props['items'] | (() => Promise<Props['items']>)
  usePortal?: boolean
  popoverClassName?: string
  filterable: Props['filterable']
  placeholder?: string
  minWidth?: StyledProps['width']
  buttonTestId?: string
  isLabel?: boolean
  labelIcon?: IconName
}

function defaultItemRenderer(item: SelectOption, props: IItemRendererProps): JSX.Element | null {
  if (!props.modifiers.matchesPredicate) {
    return null
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

export function NoMatch(): React.ReactElement {
  return <li className={cx(css.menuItem, css.disabled)}>No matching results found</li>
}

export const DropDown: React.FC<DropDownProps> = props => {
  const {
    onChange,
    value,
    items,
    itemRenderer,
    popoverClassName = '',
    usePortal,
    filterable = true,
    placeholder = 'Select',
    minWidth = 130,
    buttonTestId = 'dropdown-button',
    labelIcon,
    isLabel = false,
    query,
    onQueryChange
  } = props

  const [dropDownItems, setDropDownItems] = React.useState<SelectOption[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [internalQuery, setInternalQuery] = React.useState<string>('')
  const [activeItem, setActiveItem] = React.useState<SelectOption | null>(null)

  React.useEffect(() => {
    if (Array.isArray(items)) {
      setDropDownItems(items.filter(item => item.label.toLowerCase().includes(internalQuery.toLowerCase())))
    } else if (typeof items === 'function') {
      onQueryChange?.(internalQuery)
    }
  }, [internalQuery])

  React.useEffect(
    () => {
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
    },
    Array.isArray(items) ? [query, items] : [query]
  )

  React.useEffect(() => {
    if (value) {
      const newActiveItem = dropDownItems.find(item => item.value === value.toString())
      newActiveItem && setActiveItem(newActiveItem)
    }
  }, [value, dropDownItems])

  React.useEffect(() => {
    activeItem && onChange(activeItem)
  }, [activeItem])

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

  const isSelected = !!activeItem?.value
  const isDisabled = internalQuery.length === 0 && dropDownItems.length === 0

  return (
    <Select
      itemRenderer={(item: SelectOption, rendererProps: IItemRendererProps) =>
        itemRenderer?.(item, rendererProps) || defaultItemRenderer(item, rendererProps)
      }
      items={dropDownItems}
      onItemSelect={setActiveItem}
      activeItem={activeItem}
      filterable={filterable}
      disabled={isDisabled}
      itemListRenderer={renderMenu}
      inputProps={{
        leftElement: <Icon name={'thinner-search'} size={12} color={Color.GREY_500} />,
        placeholder: 'Search'
      }}
      query={internalQuery}
      onQueryChange={debounce(setInternalQuery, 500)}
      popoverProps={{
        targetTagName: 'div',
        wrapperTagName: 'div',
        usePortal: !!usePortal,
        minimal: true,
        position: Position.BOTTOM_LEFT,
        className: css.main,
        popoverClassName: cx(css.popover, popoverClassName)
      }}>
      <Layout.Horizontal
        data-testid={buttonTestId}
        style={{ minWidth }}
        className={cx(
          css.dropdownButton,
          { [css.withoutBorder]: isLabel },
          { [css.selected]: isSelected },
          { [css.disabled]: isDisabled }
        )}
        flex>
        <Layout.Horizontal className={css.labelWrapper} flex>
          {labelIcon && <Icon name={labelIcon} size={13} color={Color.GREY_600} />}
          <Text data-testid="dropdown-value" className={css.label}>
            {isSelected ? activeItem!.label : placeholder}
          </Text>
        </Layout.Horizontal>
        <Layout.Horizontal className={css.btnWrapper} flex>
          {isSelected && (
            <Button
              icon={'main-delete'}
              iconProps={{ size: 14, color: Color.GREY_400 }}
              minimal
              withoutBoxShadow
              withoutCurrentColor={true}
              onClick={e => {
                e.stopPropagation()
                setActiveItem({ label: '', value: '' })
              }}
            />
          )}
          <Icon name="main-chevron-down" size={8} color={Color.GREY_400} />
        </Layout.Horizontal>
      </Layout.Horizontal>
    </Select>
  )
}
