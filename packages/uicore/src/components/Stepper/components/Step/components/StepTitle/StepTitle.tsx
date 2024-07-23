/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { noop } from 'lodash-es'
import cx from 'classnames'
import { Icon } from '@harnessio/icons'
import { FontVariation } from '@harnessio/design-system'
import type { StepTitleInterface } from './StepTitle.types'
import { getStateByStatus } from './StepTitle.utils'
import { StepStatus, neutralStepStatusList } from '../../Step.constants'
import { Text, Layout } from '../../../../../../'
import css from './StepTitle.css'

export const StepTitle = ({
  step,
  index,
  isCurrent,
  stepStatus,
  onClick,
  isOptional,
  hideTitle
}: StepTitleInterface): JSX.Element => {
  const { disabled } = step
  const isDisabled = disabled
  const isErrorOrSuccess = !neutralStepStatusList.includes(stepStatus as StepStatus)
  const { icon, labelColor, iconColor, cursor } = getStateByStatus(stepStatus)

  return (
    <Layout.Vertical spacing="small">
      <Layout.Horizontal
        data-testid={`steptitle_${step.id}`}
        style={{ cursor: isErrorOrSuccess ? 'pointer' : cursor }}
        key={`${step.id}_horizontal`}
        onClick={() => (isErrorOrSuccess ? onClick(index) : noop)}
        flex={{ alignItems: 'center', justifyContent: 'start' }}>
        {isCurrent && !isDisabled ? (
          <Icon
            name={isErrorOrSuccess ? icon : 'Edit'}
            size={isErrorOrSuccess ? 20 : 16}
            margin="small"
            color={iconColor}
            className={cx(css.iconNoBorder, {
              [css.editIcon]: !isErrorOrSuccess
            })}
          />
        ) : (
          <Icon
            name={icon}
            size={20}
            margin="small"
            color={iconColor}
            className={cx(css.iconNoBorder, !isErrorOrSuccess && css.defaultState)}
          />
        )}
        {!hideTitle && (
          <Text font={{ variation: FontVariation.H5 }} color={labelColor}>
            {step.title} {isOptional && '(Optional)'}
          </Text>
        )}
      </Layout.Horizontal>
    </Layout.Vertical>
  )
}
