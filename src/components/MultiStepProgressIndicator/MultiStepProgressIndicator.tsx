/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Layout } from '../../layouts/Layout'
import React from 'react'

import css from './MultiStepProgressIndicator.css'

interface StepDetails {
  stepIndex: number
  stepStatus: 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'
}

export interface MultiStepProgressIndicatorProps {
  stepProgress: StepDetails[]
}

export const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({ stepProgress }) => {
  const Dot = <div className={css.dot}></div>
  const Bar = <div className={css.bar}></div>
  const stepCount = stepProgress?.length
  return stepCount ? (
    <Layout.Horizontal>
      {stepProgress.map(step => {
        const { stepIndex } = step
        return (
          <Layout.Horizontal flex key={stepIndex}>
            {Dot}
            {stepIndex !== stepCount - 1 ? Bar : null}
          </Layout.Horizontal>
        )
      })}
    </Layout.Horizontal>
  ) : null
}
