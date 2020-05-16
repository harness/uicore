const suffixedClassName = (className, suffix) => {
  const classNames = {
    'options-selected-container': `${className ? `${className}-options-selected-container` : ''}`,
    'options-group': `${className ? `${className}-options-group` : ''}`,
    'options-value': `${className ? `${className}-options-value` : ''}`,
    'or-separator': `${className ? `${className}-or-separator` : ''}`,
    'remove-group': `${className ? `${className}-remove-group` : ''}`,
    'multi-selector-container': `${className ? `${className}-multi-selector-container` : ''}`,
    active: `${className ? `${className}-active` : ''}`,
    'multi-level-options-container': `${className ? `${className}-multi-level-options-container` : ''}`,
    'menu-open': `${className ? `${className}-menu-open` : ''}`,
    'menu-close': `${className ? `${className}-menu-close` : ''}`,
    'options-label': `${className ? `${className}-options-label` : ''}`,
    'options-sub-menu-container': `${className ? `${className}-options-sub-menu-container` : ''}`,
    'options-sub-menu-header': `${className ? `${className}-options-sub-menu-header` : ''}`,
    'options-sub-menu': `${className ? `${className}-options-sub-menu` : ''}`,
    'arrow-up': `${className ? `${className}-arrow-up` : ''}`,
    'arrow-right': `${className ? `${className}-arrow-right` : ''}`,
    'arrow-down': `${className ? `${className}-arrow-down` : ''}`,
    'multi-selector-placeholder': `${className ? `${className}-multi-selector-placeholder` : ''}`,
  };

  return classNames[suffix];
};

export default suffixedClassName;
