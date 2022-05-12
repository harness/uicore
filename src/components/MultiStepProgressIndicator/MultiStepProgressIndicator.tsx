/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'

import { Layout } from '../../layouts/Layout'
import { Icon } from '@harness/icons'
import { Color } from '@harness/design-system'

import css from './MultiStepProgressIndicator.css'

type StepStatus = 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'

export interface MultiStepProgressIndicatorProps {
  progressMap: Map<number, StepStatus>
}

const Dot: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case 'TODO':
      return <div className={cx(css.dot, css.spacing)} />
    case 'INPROGRESS':
      return <Icon name="steps-spinner" size={20} color={Color.GREEN_600} className={css.spacing} />
    case 'FAILED':
      return <Icon name="circle-cross" size={20} color={Color.RED_600} className={css.spacing} />
    case 'SUCCESS':
      return <Icon name="success-tick" size={22} />
    default:
      return null
  }
}

const Bar: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case 'TODO':
    case 'INPROGRESS':
    case 'FAILED':
      return <div className={css.bar} />
    case 'SUCCESS':
      return <div className={cx(css.bar, css.barSuccess)} />
    default:
      return null
  }
}

export const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({ progressMap }) => {
  const entries = progressMap.size ? Array.from(progressMap.entries()) : []
  const elements: React.ReactNode[] = []

  entries.forEach((value, index) => {
    const status = value[1]
    elements.push(
      <Layout.Horizontal flex key={index}>
        <Dot status={status} />
        {index !== progressMap.size - 1 ? <Bar status={status} /> : null}
      </Layout.Horizontal>
    )
  })

  return <Layout.Horizontal>{elements}</Layout.Horizontal>
}
