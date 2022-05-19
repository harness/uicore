/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'

import { Layout } from '../../layouts/Layout'

import css from './MultiStepProgressIndicator.css'

type StepStatus = 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'

export interface MultiStepProgressIndicatorProps {
  progressMap: Map<number, StepStatus>
}

const Dot: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case 'TODO':
    case 'INPROGRESS':
    case 'FAILED':
      return <div className={cx(css.dot, css.dotOutLine, css.spacing)} />
    case 'SUCCESS':
      return <div className={cx(css.dot, css.dotSuccess, css.spacing)} />
    default:
      return null
  }
}

const Bar: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case 'TODO':
    case 'FAILED':
      return (
        <div className={css.statusBar}>
          <div className={cx(css.bar, css.fullBar)} />
        </div>
      )
    case 'INPROGRESS':
      return (
        <div className={css.statusBar}>
          <div className={cx(css.bar, css.fullBar)} />
          <div className={cx(css.bar, css.barSuccess, css.halfBar)} />
        </div>
      )
    case 'SUCCESS':
      return (
        <div className={css.statusBar}>
          <div className={cx(css.bar, css.fullBar)} />
          <div className={cx(css.bar, css.barSuccess, css.fullBar)} />
        </div>
      )
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
        {index !== 0 ? <Bar status={status} /> : null}
        <Dot status={status} />
      </Layout.Horizontal>
    )
  })

  return <Layout.Horizontal>{elements}</Layout.Horizontal>
}
