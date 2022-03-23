/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { Layout } from '../../layouts/Layout'
import { Icon } from '../../icons/Icon'
import { Color } from '@harness/design-system'

import css from './MultiStepProgressIndicator.css'

interface StepDetails {
  stepIndex: number
  stepStatus: 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'
}

export interface MultiStepProgressIndicatorProps {
  stepProgress: StepDetails[]
}

const Dot: React.FC<{ status: StepDetails['stepStatus'] }> = ({ status }) => {
  switch (status) {
    case 'TODO':
      return <div className={css.dot} />
    case 'INPROGRESS':
      return <Icon name="steps-spinner" size={22} color={Color.GREEN_600} className={css.spacing} />
    case 'FAILED':
      return <Icon name="circle-cross" size={20} color={Color.RED_600} className={css.spacing} />
    case 'SUCCESS':
      return <Icon name="success-tick" size={20} />
    default:
      return null
  }
}

export const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({ stepProgress }) => {
  const Bar = <div className={css.bar}></div>

  const stepCount = stepProgress?.length
  return stepCount ? (
    <Layout.Horizontal>
      {stepProgress.map(step => {
        const { stepIndex, stepStatus } = step
        return (
          <Layout.Horizontal flex key={stepIndex}>
            <Dot status={stepStatus} />
            {stepIndex !== stepCount - 1 ? Bar : null}
          </Layout.Horizontal>
        )
      })}
    </Layout.Horizontal>
  ) : null
}
