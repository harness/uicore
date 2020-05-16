import React from 'react'
import suffixedClassName from './suffixedClassName'
import './MultiLevelSelect.css'

class MultiLevelSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: {},
      isMenuOpen: false
    }
  }

  getClassName = suffix => {
    const { className } = this.props
    return suffixedClassName(className, suffix)
  }

  onOptionsChange = () => {
    const { onChange } = this.props
    const { selectedOption } = this.state
    onChange(selectedOption)
  }

  handleClickOutside = () => {
    const { isMenuOpen } = this.state
    return isMenuOpen && this.setState({ isMenuOpen: false })
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  selectOption = (data, parent, event) => {
    return this.setState({ selectedOption: { parent, child: data } })
  }

  renderOptionsSelected = option => {
    return (
      <div
        className={`options-selected-container ${this.getClassName('options-selected-container')}`}
        onClick={event => event.stopPropagation()}>
        {this.renderSubOptionsSelected(option)}
      </div>
    )
  }

  renderSubOptionsSelected = option => {
    const { child: { label } = {}, parent } = option

    return parent && label ? (
      <div className={`options-value ${this.getClassName('options-value')}`}>
        <span className={`options-group ${this.getClassName('options-group')}`}>
          {parent.charAt(0).toUpperCase() + parent.slice(1)} : {label}
        </span>
      </div>
    ) : null
  }

  renderCaretButton = () => {
    const { isMenuOpen } = this.state
    return (
      <div className="multi-selector-button" onClick={this.toggleMenu}>
        <div
          className={
            isMenuOpen ? `arrow-up ${this.getClassName('arrow-up')}` : `arrow-down ${this.getClassName('arrow-down')}`
          }
        />
      </div>
    )
  }

  renderPlaceholder = () => {
    const { placeholder } = this.props
    return (
      <div className={`multi-selector-placeholder ${this.getClassName('multi-selector-placeholder')}`}>
        {placeholder || 'Select'}
      </div>
    )
  }

  renderOptionsMenu = (options, parent = {}) => {
    return options.map((item, i) => {
      if (item.options) {
        return (
          <div key={`${item.value}-${i}`} className="options-container">
            <div className={`options-label ${this.getClassName('options-label')}`}>
              {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
            </div>
            {this.renderSubMenu(item, parent)}
          </div>
        )
      }
      return <React.Fragment key={`${item.value}-${i}`}>{this.renderSubMenu(item, parent)}</React.Fragment>
    })
  }

  renderSubMenu = (item, parent = {}) => {
    if (item.options) {
      return (
        <>
          <div className={`arrow-right ${this.getClassName('arrow-right')}`} />
          <div className={`options-sub-menu-container ${this.getClassName('options-sub-menu-container')}`}>
            <div className={`options-sub-menu-header ${this.getClassName('options-sub-menu-header')}`}>
              {item.value}
            </div>
            {this.renderOptionsMenu(item.options, item)}
          </div>
        </>
      )
    }

    return (
      <label>
        <div
          className={`options-sub-menu ${this.getClassName('options-sub-menu')}`}
          onClick={event => {
            this.selectOption(item, parent.value, event)
          }}>
          <div className={`options-label ${this.getClassName('options-label')}`}>{item.label}</div>
        </div>
      </label>
    )
  }

  renderCloseButton = () => {
    return (
      <span className={'close'} onClick={() => this.setState({ selectedOption: {} })}>
        x
      </span>
    )
  }

  render() {
    const { selectedOption, isMenuOpen } = this.state
    const { options } = this.props
    return (
      <div className="multi-level-selector-container">
        <div
          className={`multi-selector-container ${this.getClassName('multi-selector-container')} ${
            isMenuOpen ? `active ${this.getClassName('active')}` : 'inactive'
          }`}>
          <div className="multi-selector" onClick={this.toggleMenu}>
            {selectedOption && Object.keys(selectedOption).length > 0 ? null : this.renderPlaceholder()}
            {this.renderOptionsSelected(selectedOption)}
          </div>
          {selectedOption && Object.keys(selectedOption).length > 0 ? this.renderCloseButton() : null}
          {this.renderCaretButton()}
        </div>
        <div
          className={`multi-level-options-container ${this.getClassName('multi-level-options-container')} ${
            isMenuOpen ? `menu-open ${this.getClassName('menu-open')}` : `menu-close ${this.getClassName('menu-close')}`
          }`}>
          <div className="options-main-menu">{this.renderOptionsMenu(options)}</div>
        </div>
      </div>
    )
  }
}

export default MultiLevelSelect
