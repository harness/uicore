/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { IControlProps } from '@blueprintjs/core'
import { IconName, IconProps, Icon } from '../@harness/icons'
import css from './SwitchIcon.css'
import cx from 'classnames'
import { Layout } from '../../../layouts/Layout'
import { Label } from '../../../components/Label/Label'

export interface SwitchIconProps extends IControlProps {
  icon: IconName
  iconChecked: IconName
  iconProps: IconProps
}

export const SwitchIcon: React.FC<SwitchIconProps> = ({
  icon,
  iconChecked,
  iconProps = { size: 13 },
  className = '',
  onChange,
  checked,
  disabled,
  defaultChecked,
  inputRef,
  label,
  labelElement
}) => {
  return (
    <Layout.Horizontal
      padding="small"
      spacing="small"
      className={cx(css.switchIcon, { [css.disabled]: disabled }, className)}>
      <label className={css.toggleSwitch}>
        <input
          disabled={disabled}
          ref={inputRef}
          defaultChecked={defaultChecked}
          checked={checked}
          type="checkbox"
          onChange={onChange}
        />
        <div className={css.toggleContent}>
          <div className={css.icon}>
            <Icon {...iconProps} name={icon} />
          </div>
          <div className={css.icon}>
            <Icon {...iconProps} name={iconChecked} />
          </div>
        </div>
      </label>
      {label && !labelElement ? <Label className={css.labelClass}>{label}</Label> : labelElement}
    </Layout.Horizontal>
  )
}
