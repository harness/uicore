import React, { useMemo, useEffect, useState, createContext, useCallback } from 'react'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { IItemListRendererProps } from '@blueprintjs/select'
import cx from 'classnames'
import selectCss from '../Select/Select.css'
import { Text } from '../Text/Text'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'

// interface for component props
interface SelectWithSecondaryViewProps extends SelectProps {
  subForm: JSX.Element
  changeViewButtonLabel: string
}

const SelectWithSecondaryViewContext = createContext<{
  toggleSecondaryView: (option?: SelectOption) => string | void
  shouldDisplaySubForm: boolean
}>({ toggleSecondaryView: () => {}, shouldDisplaySubForm: false })

function initializeSelectOptions(items: SelectProps['items'], customOption: SelectOption): SelectOption[] {
  if (typeof items === 'function') {
    return [{ value: '', label: 'Loading...' }]
  }

  const ojItems = items.map((thing: SelectOption) => thing)
  ojItems.unshift(customOption)
  return ojItems
}

const SelectWithSecondaryView: React.FC<SelectWithSecondaryViewProps> = props => {
  const [shouldDisplaySubForm, setDisplayForm] = useState(false)
  const { items, changeViewButtonLabel, subForm, ...selectProps } = props
  const selectCustomOption = useMemo(() => ({ label: changeViewButtonLabel, value: changeViewButtonLabel }), [
    changeViewButtonLabel
  ])
  const [options, setOptions] = useState<SelectOption[]>(initializeSelectOptions(items, selectCustomOption))
  const toggleSecondaryView = useCallback(
    () => (optionToAddToDropdown?: SelectOption) => {
      // when no options are provided hiden subform and return to normal view
      if (!optionToAddToDropdown || !optionToAddToDropdown.label || !optionToAddToDropdown.value) {
        setDisplayForm(!shouldDisplaySubForm)
        return
      }

      // ensure uniqness of added option
      const { label, value } = optionToAddToDropdown
      if (!options.every(o => o.label !== label && o.value !== value)) {
        return `${optionToAddToDropdown.label} is already in the drop down list. Please provide a unique option.`
      }
      const ojOptions = options.filter(thing => thing?.label && thing?.value)
      ojOptions.splice(1, 0, optionToAddToDropdown)
      setDisplayForm(!shouldDisplaySubForm)
      setOptions(ojOptions)
    },
    [shouldDisplaySubForm, options]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = useCallback(
    () => (item: SelectOption, props: IItemListRendererProps) => {
      const isAddSubFormOption = item.label === changeViewButtonLabel
      return (
        <li
          key={item.value.toString()}
          className={cx(selectCss.menuItem)}
          onClick={isAddSubFormOption ? toggleSecondaryView() : props.handleClick}>
          {!isAddSubFormOption ? item.label : <Text intent="primary">{item.label}</Text>}
        </li>
      )
    },
    [changeViewButtonLabel, toggleSecondaryView]
  )

  // input from context to all context observers
  const contextProviderInput = useMemo(
    () => ({
      shouldDisplaySubForm,
      toggleSecondaryView: toggleSecondaryView()
    }),
    [shouldDisplaySubForm, toggleSecondaryView]
  )

  // function to render drop down menu, toggle between default implementation and subform depending on flag
  const subFormRenderer = useMemo(
    () => (shouldDisplaySubForm ? () => <Container className={Classes.MENU}>{subForm}</Container> : undefined),
    [shouldDisplaySubForm, subForm]
  )

  useEffect(() => {
    if (typeof items === 'function') {
      items().then?.((asyncItems: SelectOption[]) => {
        setOptions(asyncItems?.length ? [selectCustomOption, ...asyncItems] : [])
      })
    }
  }, [])

  return (
    <SelectWithSecondaryViewContext.Provider value={contextProviderInput}>
      <Select
        {...selectProps}
        allowCreatingNewItems={false}
        items={options}
        itemRenderer={itemRenderer()}
        itemListRenderer={subFormRenderer}
      />
    </SelectWithSecondaryViewContext.Provider>
  )
}

export { SelectWithSecondaryView, SelectWithSecondaryViewProps, SelectWithSecondaryViewContext }
