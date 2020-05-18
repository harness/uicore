import React, { useState, useEffect, useMemo } from 'react'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { IItemListRendererProps } from '@blueprintjs/select'
import cx from 'classnames'
import selectCss from '../Select/Select.css'
import { Text } from '../Text/Text'
import constate from 'constate'

type ToggleSubForm = {
  shouldDisplaySubForm: boolean
  customOption?: SelectOption
}

// Custom hook for toggling subform and adding a new option
function useSubForm() {
  const [{ shouldDisplaySubForm, customOption }, setDisplayForm] = useState<ToggleSubForm>({
    shouldDisplaySubForm: false,
    customOption: undefined
  })
  const toggleSubForm = (optionToAddToDropdown?: SelectOption) => {
    setDisplayForm({ shouldDisplaySubForm: !shouldDisplaySubForm, customOption: optionToAddToDropdown })
  }
  return { shouldDisplaySubForm, customOption, toggleSubForm }
}

// interface for component props
interface SelectWithSubFormProps extends SelectProps {
  subForm: JSX.Element
  changeViewButtonLabel: string
}

// create the context objects
const [SelectWithSubFormContextProvider, useSelectWithSubFormContext] = constate(useSubForm)

function SubFormRenderer(props: SelectWithSubFormProps) {
  const { subForm, changeViewButtonLabel, items, ...selectProps } = props
  const { shouldDisplaySubForm, customOption, toggleSubForm } = useSelectWithSubFormContext()
  const [itemList, setItems] = useState<SelectOption[]>(
    typeof items === 'function' ? [{ value: '', label: 'Loading...' }] : items
  )
  const updatedItems = useMemo(() => (customOption ? [customOption, ...itemList] : itemList), [itemList, customOption])

  useEffect(() => {
    if (typeof items === 'function') {
      items().then?.(items => {
        setItems(items ? [{ value: '', label: changeViewButtonLabel }, ...items] : [])
      })
    }
  }, [items])

  const itemRenderer = (item: SelectOption, props: IItemListRendererProps) => {
    if (shouldDisplaySubForm) {
      return subForm
    }
    const isAddSubFormOption = item.label === changeViewButtonLabel
    return (
      <li
        key={item.value.toString()}
        className={cx(selectCss.menuItem)}
        onClick={isAddSubFormOption ? toggleSubForm : props.handleClick}>
        {isAddSubFormOption ? item.label : <Text>{item.label}</Text>}
      </li>
    )
  }

  return (
    <Select
      {...selectProps}
      itemRender={itemRenderer}
      items={shouldDisplaySubForm ? [{ value: '', label: 'displayForm' }] : updatedItems}
    />
  )
}

function SelectWithSubForm(props: SelectWithSubFormProps) {
  return (
    <SelectWithSubFormContextProvider>
      <SubFormRenderer {...props} />
    </SelectWithSubFormContextProvider>
  )
}

export { SelectWithSubForm, useSelectWithSubFormContext, SelectWithSubFormProps }
