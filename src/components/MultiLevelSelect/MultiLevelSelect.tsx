import React, { useState } from 'react'
import './MultiLevelSelect.css'

interface Option {
  value: string
  label: string
}

interface InputOptionsInterface {
  value: string
  label: string
  options?: InputOptionsInterface[]
}

interface MultiLevelSelectProps {
  options: InputOptionsInterface[]
  placeholder: string
  onChange: (selectedOption: SelectedOption) => void
  className?: string
}

interface SelectedOption {
  child: Option
  parent: Option
}

export function MultiLevelSelect(props: MultiLevelSelectProps) {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    child: { label: '', value: '' },
    parent: { label: '', value: '' }
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onOptionsChange = () => {
    const { onChange } = props
    onChange(selectedOption)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const selectOption = (data: Option, parent: Option, event: any) => {
    event.preventDefault()
    setSelectedOption({ parent, child: data })
    onOptionsChange()
  }

  const renderSubOptionsSelected = (option: SelectedOption) => {
    const { child, parent } = option
    const parentLabel = parent?.label ?? ''
    return child.label ? (
      <div className={`options-value`}>
        <span className={`options-group`}>
          {parentLabel.charAt(0).toUpperCase() + parentLabel.slice(1)} {parentLabel ? ':' : null} {child?.label}
        </span>
      </div>
    ) : null
  }

  const renderOptionsSelected = (option: SelectedOption) => {
    return (
      <div className={`options-selected-container`} onClick={event => event.stopPropagation()}>
        {renderSubOptionsSelected(option)}
      </div>
    )
  }

  const renderCaretButton = () => {
    return (
      <div className="multi-selector-button" onClick={toggleMenu}>
        <div className={isMenuOpen ? `arrow-up` : `arrow-down`} />
      </div>
    )
  }

  const renderPlaceholder = () => {
    const { placeholder } = props
    return <div className={`multi-selector-placeholder`}>{placeholder || 'Select'}</div>
  }

  const renderOptionsMenu = (options: InputOptionsInterface[], parent: Option) => {
    return options.map((item, i) => {
      if (item.options) {
        return (
          <div key={`${item.value}-${i}`} className="options-container">
            <div className={`options-label`}>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</div>
            {renderSubMenu(item, parent)}
          </div>
        )
      }
      return <React.Fragment key={`${item.value}-${i}`}>{renderSubMenu(item, parent)}</React.Fragment>
    })
  }

  const renderSubMenu = (item: InputOptionsInterface, parent: Option) => {
    if (item.options) {
      return (
        <>
          <div className={`arrow-right`} />
          <div className={`options-sub-menu-container`}>
            <div className={`options-sub-menu-header`}>{item.value}</div>
            {renderOptionsMenu(item.options, item)}
          </div>
        </>
      )
    }

    return (
      <label>
        <div
          className={`options-sub-menu`}
          onClick={event => {
            selectOption(item, parent, event)
          }}>
          <div className={`options-label`}>{item.label}</div>
        </div>
      </label>
    )
  }

  const renderCloseButton = () => {
    return (
      <span
        className={'close'}
        onClick={() => setSelectedOption({ child: { label: '', value: '' }, parent: { label: '', value: '' } })}>
        x
      </span>
    )
  }

  const isOptionSelected = (selectedOption: SelectedOption) => {
    const { child } = selectedOption || {}
    return child && child.label && child.value
  }

  const { options } = props
  return (
    <div className="multi-level-selector-container">
      <div className={`multi-selector-container ${isMenuOpen ? `active` : 'inactive'}`}>
        <div className="multi-selector" onClick={toggleMenu}>
          {isOptionSelected(selectedOption) ? null : renderPlaceholder()}
          {renderOptionsSelected(selectedOption)}
        </div>
        {isOptionSelected(selectedOption) ? renderCloseButton() : null}
        {renderCaretButton()}
      </div>
      <div className={`multi-level-options-container ${isMenuOpen ? `menu-open` : `menu-close`}`}>
        <div className="options-main-menu">{renderOptionsMenu(options, { label: '', value: '' })}</div>
      </div>
    </div>
  )
}
