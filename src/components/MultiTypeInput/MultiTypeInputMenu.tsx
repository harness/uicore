import React from 'react'
import cx from 'classnames'

import { Menu } from '@blueprintjs/core'
import { MultiTypeInputType, MultiTypeIcon as TypeIcon, MultiTypeIconSize as TypeIconSize } from './MultiTypeInputUtils'
import { Icon } from '../../icons/Icon'
import { I18nResource } from '../../core/Types'

import css from './MultiTypeInput.css'
import i18nBase from './MultiTypeInput.i18n'

export interface MultiTypeInputMenuProps {
  allowedTypes: MultiTypeInputType[]
  i18n?: I18nResource
  onTypeSelect(type: MultiTypeInputType): void
}

export function MultiTypeInputMenu(props: MultiTypeInputMenuProps): React.ReactElement {
  const { allowedTypes, i18n = i18nBase, onTypeSelect } = props
  return (
    <Menu className={css.menu}>
      {allowedTypes.includes(MultiTypeInputType.FIXED) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.FIXED])}
          labelElement={<Icon name={TypeIcon.FIXED} size={TypeIconSize.FIXED} />}
          text={i18n.fixedValue}
          onClick={() => onTypeSelect(MultiTypeInputType.FIXED)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.RUNTIME) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.RUNTIME])}
          labelElement={<Icon name={TypeIcon.RUNTIME} size={TypeIconSize.RUNTIME} />}
          text={i18n.runtimeInput}
          onClick={() => onTypeSelect(MultiTypeInputType.RUNTIME)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.EXPRESSION) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.EXPRESSION])}
          labelElement={<Icon name={TypeIcon.EXPRESSION} size={TypeIconSize.EXPRESSION} />}
          text={i18n.expression}
          onClick={() => onTypeSelect(MultiTypeInputType.EXPRESSION)}
        />
      )}
    </Menu>
  )
}
