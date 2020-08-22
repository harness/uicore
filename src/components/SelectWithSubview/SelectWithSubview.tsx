import React, { useMemo, useEffect, useState, createContext, useCallback, MouseEventHandler } from 'react'
import { Select, SelectOption, SelectProps } from '../Select/Select'
import selectCss from '../Select/Select.css'
import css from './SelectWithSubview.css'
import { Text } from '../Text/Text'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'
import { MultiSelectOption } from 'components/MultiSelect/MultiSelect'
import { IItemRendererProps } from '@blueprintjs/select'

// interface for component props
export interface SelectWithSubviewProps extends SelectProps {
  subview: JSX.Element
  changeViewButtonLabel: string
  renderSubviewWithoutMenuStyling?: boolean
}

export const SelectWithSubviewContext = createContext<{
  toggleSubview: (option?: SelectOption) => string | void
  shouldDisplaySubview: boolean
}>({ toggleSubview: () => {}, shouldDisplaySubview: false })

type ToggleDropDownArgs = {
  changeViewButtonLabel: string
  items: SelectProps['items'] | MultiSelectOption[]
  subview: JSX.Element
  itemRenderer?: (
    toggleSubview: () => void
  ) => (item: SelectOption | MultiSelectOption, itemProps: IItemRendererProps) => JSX.Element | null
  renderSubviewWithoutMenuStyling?: boolean
}

function initializeSelectOptions(items: SelectProps['items'], customOption: SelectOption): SelectOption[] {
  return typeof items === 'function' ? [{ value: '', label: 'Loading...' }] : [customOption, ...items]
}

export function useToggleDropDownSubviewHook({
  changeViewButtonLabel,
  items,
  subview,
  renderSubviewWithoutMenuStyling,
  itemRenderer: propsItemRenderer
}: ToggleDropDownArgs) {
  const [shouldDisplaySubview, setDisplayForm] = useState(false)
  const selectCustomOption = useMemo(() => ({ label: changeViewButtonLabel, value: changeViewButtonLabel }), [
    changeViewButtonLabel
  ])
  const [options, setOptions] = useState<SelectOption[] | MultiSelectOption[]>(
    initializeSelectOptions(items, selectCustomOption)
  )

  // called when clicking on changeViewButtonLabel and when closing subview
  const toggleSubview = useCallback(
    (optionToAddToDropdown?: SelectOption | MultiSelectOption) => {
      // when no options are provided, hide subview and return to normal view
      if (!optionToAddToDropdown || !optionToAddToDropdown.label || !optionToAddToDropdown.value) {
        setDisplayForm(!shouldDisplaySubview)
        return
      }

      // ensure uniqness of added option
      const { label, value } = optionToAddToDropdown
      if (!options.every((o: SelectOption | MultiSelectOption) => o.label !== label && o.value !== value)) {
        return `${optionToAddToDropdown.label} is already in the drop down list. Please provide a unique option.`
      }
      const ojOptions: SelectOption[] | MultiSelectOption[] = (options as []).filter(
        (option: SelectOption | MultiSelectOption) => option !== undefined && option !== null
      )
      ojOptions.splice(1, 0, optionToAddToDropdown)
      setDisplayForm(!shouldDisplaySubview)
      setOptions(ojOptions)
    },
    [shouldDisplaySubview, options, setDisplayForm, setOptions]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = propsItemRenderer
    ? propsItemRenderer(toggleSubview)
    : useCallback(
        (item: SelectOption | MultiSelectOption, { handleClick }: { handleClick: MouseEventHandler<HTMLElement> }) => {
          const isAddSubviewOption = item.label === changeViewButtonLabel
          return (
            <li
              key={item.value.toString()}
              className={selectCss.menuItem}
              onClick={isAddSubviewOption ? () => toggleSubview() : handleClick}>
              {!isAddSubviewOption ? item.label : <Text intent="primary">{item.label}</Text>}
            </li>
          )
        },
        [changeViewButtonLabel, toggleSubview]
      )

  // function to render drop down menu, toggle between default implementation and subview depending on flag
  const itemListRenderer = useMemo(
    () =>
      shouldDisplaySubview
        ? () => <Container className={renderSubviewWithoutMenuStyling ? '' : Classes.MENU}>{subview}</Container>
        : undefined,
    [shouldDisplaySubview, subview, renderSubviewWithoutMenuStyling]
  )

  // on popover close callback, if showing form reset to dropdown
  const onPopoverCloseCallback = useCallback(() => {
    if (shouldDisplaySubview) {
      setDisplayForm(false)
    }
  }, [shouldDisplaySubview, setDisplayForm])

  useEffect(() => {
    if (typeof items === 'function') {
      items().then?.((asyncItems: SelectOption[]) => {
        setOptions(asyncItems?.length ? [selectCustomOption, ...asyncItems] : [])
      })
    }
  }, [])

  return { onPopoverCloseCallback, itemListRenderer, itemRenderer, options, shouldDisplaySubview, toggleSubview }
}

export const SelectWithSubview: React.FC<SelectWithSubviewProps> = props => {
  const { items, changeViewButtonLabel, subview, className, renderSubviewWithoutMenuStyling, ...selectProps } = props
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
    renderSubviewWithoutMenuStyling
  })

  // input from context to all context observers
  const contextProviderInput = useMemo(
    () => ({
      shouldDisplaySubview,
      toggleSubview
    }),
    [shouldDisplaySubview, toggleSubview]
  )

  return (
    <SelectWithSubviewContext.Provider value={contextProviderInput}>
      <Select
        {...selectProps}
        allowCreatingNewItems={false}
        items={options}
        itemRenderer={itemRenderer}
        itemListRenderer={itemListRenderer}
        className={shouldDisplaySubview && renderSubviewWithoutMenuStyling ? css.removeDropdownStyling : className}
        whenPopoverClosed={onPopoverCloseCallback}
      />
    </SelectWithSubviewContext.Provider>
  )
}
