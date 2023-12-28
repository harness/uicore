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
import { Color } from '@harnessio/design-system'
import { defaultTo, noop } from 'lodash-es'

type StepStatus = 'TODO' | 'INPROGRESS' | 'FAILED' | 'SUCCESS'

export interface MultiStepProgressIndicatorProps {
  progressMap: Map<number, { StepStatus: StepStatus; StepName?: string; onClick?: () => void }>
  className?: string
  textClassName?: string
  barWidth?: number
}
const Dot: React.FC<{ status: StepStatus; name?: string; className?: string }> = ({ status, name, className }) => {
  switch (status) {
    case 'TODO':
    case 'FAILED':
      return (
        <Layout.Vertical flex>
          <div className={css.dotNameFailed}>
            <Text lineClamp={1} className={cx(css.textmaxlength, className)}>
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
            <Text lineClamp={1} className={cx(css.textmaxlength, className)} color={Color.PRIMARY_7}>
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

const Bar: React.FC<{ status: StepStatus; barWidth?: number }> = ({ status, barWidth }) => {
  const fullBarWidth = barWidth && barWidth > 0 ? { width: `${barWidth}px` } : {}
  const halfBarWidth = barWidth && barWidth > 0 ? { width: `${barWidth / 2}px` } : {}
  switch (status) {
    case 'TODO':
    case 'FAILED':
      return (
        <div className={css.statusBar} style={fullBarWidth}>
          <div className={cx(css.bar, css.fullBar)} style={fullBarWidth} />
        </div>
      )
    case 'INPROGRESS':
      return (
        <div className={css.statusBar} style={fullBarWidth}>
          <div className={cx(css.bar, css.fullBar)} style={fullBarWidth} />
          <div className={cx(css.bar, css.barSuccess, css.halfBar)} style={halfBarWidth} />
        </div>
      )
    case 'SUCCESS':
      return (
        <div className={css.statusBar} style={fullBarWidth}>
          <div className={cx(css.bar, css.barSuccess, css.fullBar)} style={fullBarWidth} />
        </div>
      )
    default:
      return null
  }
}

export const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({
  progressMap,
  className = '',
  textClassName = '',
  barWidth
}) => {
  const entries = progressMap.size ? Array.from(progressMap.entries()) : []

  const elements: React.ReactNode[] = []

  entries.forEach((value, index) => {
    const status = value[1].StepStatus
    const name = value[1].StepName
    const onClick = defaultTo(value[1].onClick, noop)

    elements.push(
      <Layout.Horizontal flex key={index} onClick={onClick}>
        <Dot status={status} name={name} className={textClassName} />
        {index !== entries.length - 1 ? <Bar status={status} barWidth={barWidth} /> : null}
      </Layout.Horizontal>
    )
  })

  return <Layout.Horizontal className={className}>{elements}</Layout.Horizontal>
}
