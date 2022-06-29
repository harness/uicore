/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'

import { Layout } from '../../layouts/Layout'
import { Text } from '../..'

import css from './MultiStepProgressIndicator.css'
import { Color } from '@harness/design-system'

type StepStatus = 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'

export interface MultiStepProgressIndicatorProps {
  progressMap: Map<number, { StepStatus: StepStatus; StepName?: string }>
}

const Dot: React.FC<{ status: StepStatus; name?: string }> = ({ status, name }) => {
  switch (status) {
    case 'TODO':
    case 'FAILED':
      return (
        <Layout.Vertical flex>
          <div className={css.dotNameFailed}>
            <Text lineClamp={1} className={css.textmaxlength}>
              {name}
            </Text>
          </div>
          <div className={cx(css.dot, css.dotOutLine, css.spacing)} />
        </Layout.Vertical>
      )
    case 'INPROGRESS':
    case 'SUCCESS':
      return (
        <Layout.Vertical flex>
          <div className={css.dotNameSuccess}>
            <Text lineClamp={1} className={css.textmaxlength} color={Color.PRIMARY_7}>
              {name}
            </Text>
          </div>
          <div className={cx(css.dot, css.dotSuccess, css.spacing)} />
        </Layout.Vertical>
      )
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
    const status = value[1].StepStatus
    const name = value[1].StepName

    elements.push(
      <Layout.Horizontal flex key={index}>
        <Dot status={status} name={name} />
        {index !== entries.length - 1 ? <Bar status={status} /> : null}
      </Layout.Horizontal>
    )
  })

  return <Layout.Horizontal>{elements}</Layout.Horizontal>
}
