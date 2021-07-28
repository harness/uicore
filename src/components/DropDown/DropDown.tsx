import React from 'react'
import { Select as BPSelect, ISelectProps, IItemRendererProps } from '@blueprintjs/select'
import { Button } from '../Button/Button'
import { Color } from '../../core/Color'
import { Layout } from '../../layouts/Layout'
import css from './DropDown.css'
import { SelectOption } from '../Select/Select'
import { Icon, IconName } from '../../icons/Icon'
import { Text } from '../Text/Text'
import cx from 'classnames'
import { Position } from '@blueprintjs/core'
import { StyledProps } from '../../styled-props/StyledProps'

const Select = BPSelect.ofType<SelectOption>()

type Props = ISelectProps<SelectOption>

export interface DropDownProps
  extends Omit<
    Props,
    'popoverProps' | 'itemRenderer' | 'onItemSelect' | 'items' | 'activeItem' | 'onActiveItemChange'
  > {
  itemRenderer?: Props['itemRenderer']
  onChange: Props['onItemSelect']
  value?: SelectOption | null
  items: Props['items']
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
    isLabel = false
  } = props

  return (
    <Select
      itemRenderer={(item: SelectOption, props: IItemRendererProps) =>
        itemRenderer?.(item, props) || defaultItemRenderer(item, props)
      }
      itemListPredicate={(query, items) => items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))}
      noResults={<NoMatch />}
      items={items}
      onItemSelect={onChange}
      activeItem={value}
      filterable={filterable}
      disabled={items.length === 0}
      inputProps={{
        leftElement: <Icon name={'thinner-search'} size={12} color={Color.GREY_500} />,
        placeholder: 'Search'
      }}
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
          { [css.selected]: value?.value },
          { [css.disabled]: items.length === 0 }
        )}
        flex>
        <Layout.Horizontal className={css.labelWrapper} flex>
          {labelIcon && <Icon name={labelIcon} size={13} color={Color.GREY_600} />}
          <Text data-testid="dropdown-value" className={cx(css.label, { [css.disabled]: items.length === 0 })}>
            {(value as SelectOption)?.label || placeholder}
          </Text>
        </Layout.Horizontal>
        <Layout.Horizontal className={css.btnWrapper} flex>
          {value?.value && (
            <Button
              icon={'main-delete'}
              iconProps={{ size: 14, color: Color.GREY_400 }}
              minimal
              withoutBoxShadow
              withoutCurrentColor={true}
              onClick={e => {
                e.stopPropagation()
                onChange({ label: '', value: '' })
              }}
            />
          )}
          <Icon name="main-chevron-down" size={8} color={Color.GREY_400} />
        </Layout.Horizontal>
      </Layout.Horizontal>
    </Select>
  )
}
