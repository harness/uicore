import React, { useMemo, useEffect, useState, createContext, useCallback, MouseEventHandler } from 'react'
import { Select, SelectOption, SelectProps } from '../Select/Select'
import cx from 'classnames'
import selectCss from '../Select/Select.css'
import css from './SelectWithSubview.css'
import { Text } from '../Text/Text'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'

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

function initializeSelectOptions(items: SelectProps['items'], customOption: SelectOption): SelectOption[] {
  return typeof items === 'function' ? [{ value: '', label: 'Loading...' }] : [customOption, ...items]
}

export const SelectWithSubview: React.FC<SelectWithSubviewProps> = props => {
  const [shouldDisplaySubview, setDisplayForm] = useState(false)
  const { items, changeViewButtonLabel, subview, renderSubviewWithoutMenuStyling, className, ...selectProps } = props
  const selectCustomOption = useMemo(() => ({ label: changeViewButtonLabel, value: changeViewButtonLabel }), [
    changeViewButtonLabel
  ])
  const [options, setOptions] = useState<SelectOption[]>(initializeSelectOptions(items, selectCustomOption))
  const toggleSubview = useCallback(
    () => (optionToAddToDropdown?: SelectOption) => {
      // when no options are provided hiden subview and return to normal view
      if (!optionToAddToDropdown || !optionToAddToDropdown.label || !optionToAddToDropdown.value) {
        setDisplayForm(!shouldDisplaySubview)
        return
      }

      // ensure uniqness of added option
      const { label, value } = optionToAddToDropdown
      if (!options.every(o => o.label !== label && o.value !== value)) {
        return `${optionToAddToDropdown.label} is already in the drop down list. Please provide a unique option.`
      }
      const ojOptions = options.filter(thing => thing?.label && thing?.value)
      ojOptions.splice(1, 0, optionToAddToDropdown)
      setDisplayForm(!shouldDisplaySubview)
      setOptions(ojOptions)
    },
    [shouldDisplaySubview, options, setDisplayForm, setOptions]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = useCallback(
    () => (item: SelectOption, { handleClick }: { handleClick: MouseEventHandler<HTMLElement> }) => {
      const isAddSubviewOption = item.label === changeViewButtonLabel
      return (
        <li
          key={item.value.toString()}
          className={cx(selectCss.menuItem)}
          onClick={isAddSubviewOption ? () => toggleSubview()() : handleClick}>
          {!isAddSubviewOption ? item.label : <Text intent="primary">{item.label}</Text>}
        </li>
      )
    },
    [changeViewButtonLabel, toggleSubview]
  )

  // input from context to all context observers
  const contextProviderInput = useMemo(
    () => ({
      shouldDisplaySubview,
      toggleSubview: toggleSubview()
    }),
    [shouldDisplaySubview, toggleSubview]
  )

  // function to render drop down menu, toggle between default implementation and subview depending on flag
  const subviewRenderer = useMemo(
    () =>
      shouldDisplaySubview
        ? () => <Container className={renderSubviewWithoutMenuStyling ? '' : Classes.MENU}>{subview}</Container>
        : undefined,
    [shouldDisplaySubview, subview, renderSubviewWithoutMenuStyling]
  )

  // on popover close callback, if showing form reset to dropdown
  const onPopoverCloseCallback = useCallback(
    () => () => {
      if (shouldDisplaySubview) {
        setDisplayForm(false)
      }
    },
    [shouldDisplaySubview, setDisplayForm]
  )

  useEffect(() => {
    if (typeof items === 'function') {
      items().then?.((asyncItems: SelectOption[]) => {
        setOptions(asyncItems?.length ? [selectCustomOption, ...asyncItems] : [])
      })
    }
  }, [])

  return (
    <SelectWithSubviewContext.Provider value={contextProviderInput}>
      <Select
        {...selectProps}
        allowCreatingNewItems={false}
        items={options}
        itemRenderer={itemRenderer()}
        itemListRenderer={subviewRenderer}
        className={shouldDisplaySubview && renderSubviewWithoutMenuStyling ? css.removeDropdownStyling : className}
        whenPopoverClosed={onPopoverCloseCallback()}
      />
    </SelectWithSubviewContext.Provider>
  )
}
