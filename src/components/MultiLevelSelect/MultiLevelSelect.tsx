import React, { useState } from 'react'
import css from './MultiLevelSelect.css'

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

export default function MultiLevelSelect(props: MultiLevelSelectProps) {
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
    return child?.label ? (
      <div className={css.optionsValue}>
        <span className={css.optionsGroup}>
          {parentLabel.charAt(0).toUpperCase() + parentLabel.slice(1)} {parentLabel ? ':' : null} {child?.label}
        </span>
      </div>
    ) : null
  }

  const renderOptionsSelected = (option: SelectedOption) => {
    return (
      <div className={css.optionsSelectedContainer} onClick={event => event.stopPropagation()}>
        {renderSubOptionsSelected(option)}
      </div>
    )
  }

  const renderCaretButton = () => {
    return (
      <div className={css.multiSelectorButton} onClick={toggleMenu}>
        <div className={isMenuOpen ? css.arrowUp : css.arrowDown} />
      </div>
    )
  }

  const renderPlaceholder = () => {
    const { placeholder } = props
    return <div className={css.multiSelectorPlaceholder}>{placeholder || 'Select'}</div>
  }

  const renderOptionsMenu = (options: InputOptionsInterface[] = [], parent: Option) => {
    return options.map((item, i) => {
      if (item.options) {
        const label = item.label.charAt(0).toUpperCase() + item.label.slice(1)
        return (
          <div key={item.value} className={css.optionsContainer}>
            <div className={css.optionsLabel} title={label}>
              {label}
            </div>
            {renderSubMenu(item, parent)}
          </div>
        )
      }
      return <React.Fragment key={item.value}>{renderSubMenu(item, parent)}</React.Fragment>
    })
  }

  const renderSubMenu = (item: InputOptionsInterface, parent: Option) => {
    if (item.options && item.options.length > 0) {
      return (
        <>
          <div className={css.arrowRight} />
          <div className={css.optionsSubMenuContainer}>
            <div className={css.optionsSubMenuHeader}>{item.value}</div>
            {renderOptionsMenu(item.options, item)}
          </div>
        </>
      )
    }

    return (
      <label className={css.label}>
        <div
          className={css.optionsSubMenu}
          onClick={event => {
            selectOption(item, parent, event)
          }}>
          <div className={css.optionsLabel}>{item.label}</div>
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

  const { options = [] } = props
  return options && Array.isArray(options) && options.length > 0 ? (
    <div className={css.multiLevelSelectorContainer}>
      <div className={`${css.multiSelectorContainer} ${isMenuOpen ? css.active : css.inactive}`}>
        <div className={css.multiSelector} onClick={toggleMenu}>
          {isOptionSelected(selectedOption) ? null : renderPlaceholder()}
          {renderOptionsSelected(selectedOption)}
        </div>
        {isOptionSelected(selectedOption) ? renderCloseButton() : null}
        {renderCaretButton()}
      </div>
      <div className={`${css.multiLevelOptionsContainer} ${isMenuOpen ? css.menuOpen : css.menuClose}`}>
        <div className={css.optionsMainMenu}>{renderOptionsMenu(options, { label: '', value: '' })}</div>
      </div>
    </div>
  ) : (
    <span>No options provided in the props</span>
  )
}
