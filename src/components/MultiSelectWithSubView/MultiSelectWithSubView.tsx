import React from 'react'
import { MultiSelect, MultiSelectProps, MultiSelectOption } from '../MultiSelect/MultiSelect'
import { useToggleDropDownSubviewHook, SelectWithSubviewContext } from '../SelectWithSubview/SelectWithSubview'
import selectCss from '../Select/Select.css'
import multiselectCSS from '../MultiSelect/MultiSelect.css'
import css from '../SelectWithSubview/SelectWithSubview.css'
import { IItemRendererProps } from '@blueprintjs/select'
import { Text } from '../Text/Text'
import cx from 'classnames'

export interface MultiSelectWithSubviewProps {
  items: MultiSelectOption[]
  value: MultiSelectProps['value']
  changeViewButtonLabel: string
  subview: JSX.Element
  multiSelectProps?: Omit<MultiSelectProps, 'items' | 'value'>
  renderSubviewWithoutMenuStyling?: boolean
}

export function MultiSelectWithSubview(props: MultiSelectWithSubviewProps): JSX.Element {
  const { items, changeViewButtonLabel, value, subview, multiSelectProps, renderSubviewWithoutMenuStyling } = props

  const multiSelectItemRenderer = (renderSubview: () => void) => {
    // eslint-disable-next-line react/display-name
    return (item: MultiSelectOption, rendererProps: IItemRendererProps): JSX.Element | null => {
      if (!rendererProps.modifiers.matchesPredicate) {
        return null
      }

      if (item.label === changeViewButtonLabel) {
        return (
          <li
            key={item?.value.toString() || ''}
            className={selectCss.menuItem}
            style={{ padding: '0 var(--spacing-small)', paddingTop: 'var(--spacing-small)' }}
            onClick={() => renderSubview()}>
            <Text intent="primary">{item.label}</Text>
          </li>
        )
      }

      return (
        <li
          key={item.value?.toString()}
          className={cx(multiselectCSS.menuItem, {
            [multiselectCSS.active]: rendererProps.modifiers.active,
            [multiselectCSS.disabled]: rendererProps.modifiers.disabled || item.disabled
          })}
          onClick={rendererProps.handleClick}>
          <input
            className={multiselectCSS.checkbox}
            type="checkbox"
            value={item.value?.toString()}
            checked={value && value.findIndex(val => val.value === item.value) > -1}
            disabled={item.disabled}
            readOnly
          />
          {item.label}
        </li>
      )
    }
  }

  const {
    onPopoverCloseCallback,
    itemListRenderer,
    itemRenderer,
    options,
    shouldDisplaySubview,
    toggleSubview
  } = useToggleDropDownSubviewHook({
    changeViewButtonLabel,
    items,
    subview,
    itemRenderer: multiSelectItemRenderer,
    renderSubviewWithoutMenuStyling
  })

  return (
    <SelectWithSubviewContext.Provider
      value={{
        shouldDisplaySubview,
        toggleSubview
      }}>
      <MultiSelect
        {...multiSelectProps}
        value={value}
        onPopoverClose={onPopoverCloseCallback}
        items={options}
        allowCreatingNewItems={false}
        itemListRenderer={itemListRenderer}
        className={
          shouldDisplaySubview && renderSubviewWithoutMenuStyling
            ? css.removeDropdownStyling
            : multiSelectProps?.className
        }
        itemRender={itemRenderer}
      />
    </SelectWithSubviewContext.Provider>
  )
}
