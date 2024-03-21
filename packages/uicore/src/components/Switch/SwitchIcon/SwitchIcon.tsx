/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { IControlProps } from '@blueprintjs/core'
import { IconName, IconProps, Icon } from '@harnessio/icons'
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
