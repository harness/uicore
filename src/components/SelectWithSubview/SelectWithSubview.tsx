import React, { useMemo, useEffect, useState, createContext, useCallback } from 'react'
import { Select, SelectProps, SelectOption } from '../Select/Select'
import { IItemListRendererProps } from '@blueprintjs/select'
import cx from 'classnames'
import selectCss from '../Select/Select.css'
import { Text } from '../Text/Text'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'

// interface for component props
interface SelectWithSubviewProps extends SelectProps {
  subview: JSX.Element
  changeViewButtonLabel: string
}

const SelectWithSubviewContext = createContext<{
  toggleSubview: (option?: SelectOption) => string | void
  shouldDisplaySubview: boolean
}>({ toggleSubview: () => {}, shouldDisplaySubview: false })

function initializeSelectOptions(items: SelectProps['items'], customOption: SelectOption): SelectOption[] {
  if (typeof items === 'function') {
    return [{ value: '', label: 'Loading...' }]
  }

  // const ojItems = items.map((thing: SelectOption) => thing)
  // ojItems.unshift(customOption)
  // return ojItems
  return [customOption, ...items]
}

const SelectWithSubview: React.FC<SelectWithSubviewProps> = props => {
  const [shouldDisplaySubview, setDisplayForm] = useState(false)
  const { items, changeViewButtonLabel, subview, ...selectProps } = props
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
    [shouldDisplaySubview, options]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = useCallback(
    () => (item: SelectOption, props: IItemListRendererProps) => {
      const isAddSubviewOption = item.label === changeViewButtonLabel
      return (
        <li
          key={item.value.toString()}
          className={cx(selectCss.menuItem)}
          onClick={isAddSubviewOption ? toggleSubview() : props.handleClick}>
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
    () => (shouldDisplaySubview ? () => <Container className={Classes.MENU}>{subview}</Container> : undefined),
    [shouldDisplaySubview, subview]
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
      />
    </SelectWithSubviewContext.Provider>
  )
}

export { SelectWithSubview, SelectWithSubviewProps, SelectWithSubviewContext }
