/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Text } from '../Text/Text'
import { Container } from '../Container/Container'
import { Color } from '@harness/design-system'
import css from './StepsProgress.css'
import { ProgressBar, IProgressBarProps, Intent } from '@blueprintjs/core'
import { Layout } from '../../layouts/Layout'
import { Icon } from '@harness/icons'

export interface StepsProgressProps {
  steps: Array<JSX.Element | string>
  current: number
  currentStatus: string
  intent?: Intent
}

interface StringMap {
  [key: string]: string
}

const fontsEnums: StringMap = {
  WAIT: 'normal',
  PROCESS: 'bold',
  DONE: 'bold',
  ERROR: ''
}

const statusEnums: StringMap = {
  WAIT: Color.YELLOW_500,
  PROCESS: Color.YELLOW_500,
  DONE: Color.GREEN_500,
  ERROR: Color.RED_500
}

const iconEnums: any = {
  WAIT: 'blank',
  PROCESS: 'steps-spinner',
  DONE: 'tick',
  ERROR: 'error'
}

export function StepsProgress(props: StepsProgressProps) {
  const { steps, current, currentStatus, intent } = props
  const stepSize = 1 / steps.length
  let calculatedStepSize = 0
  if (currentStatus === 'PROCESS') {
    calculatedStepSize = (current - 1) * stepSize
  } else {
    calculatedStepSize = current * stepSize
  }

  const progressBarProps: IProgressBarProps = {
    value: calculatedStepSize,
    stripes: false,
    intent: intent
  }
  let stepsWithStatus
  if (steps && steps.length) {
    stepsWithStatus = steps.map((data, index) => ({
      label: data,
      fonts:
        index + 1 === current
          ? fontsEnums[currentStatus]
          : index + 1 < current
          ? fontsEnums['DONE']
          : fontsEnums['WAIT'],
      stepStatus:
        index + 1 === current ? iconEnums[currentStatus] : index + 1 < current ? iconEnums['DONE'] : iconEnums['WAIT'],
      stepIconColor:
        index + 1 === current
          ? statusEnums[currentStatus]
          : index + 1 < current
          ? statusEnums['DONE']
          : statusEnums['WAIT']
    }))
  }

  return (
    <Layout.Vertical id="steps-progress" className={css.stepsProgress} spacing="large">
      <div className={css.progressBar}>
        <ProgressBar {...progressBarProps} className={css.progressHeight} />
      </div>
      <Layout.Vertical spacing="large">
        {stepsWithStatus && stepsWithStatus.length ? (
          stepsWithStatus.map(step => (
            <div key={`${step}`} className={css.stepWrap}>
              <Icon name={step.stepStatus} size={16} color={step.stepIconColor} margin={{ right: 'small' }} />
              <Container className={css.stepLabelContainer} style={{ fontWeight: step.fonts } as React.CSSProperties}>
                {step.label}
              </Container>
            </div>
          ))
        ) : (
          <Text>No Steps Available</Text>
        )}
      </Layout.Vertical>
    </Layout.Vertical>
  )
}
