/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { StepNavButtonsInterface } from './StepNavButtons.types'
import { Button, Layout, ButtonVariation } from '../../../../../../'

export const StepNavButtons = ({
  index,
  isLastStep,
  onContinue,
  nextButtonTitle,
  disableNext
}: StepNavButtonsInterface): JSX.Element => {
  return (
    <Layout.Horizontal spacing="small" padding={{ top: 'xlarge' }}>
      {index > 0 && (
        <Button
          data-testid="backButton"
          variation={ButtonVariation.SECONDARY}
          onClick={() => onContinue(index - 1, true)}
          icon={'chevron-left'}>
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button
          data-testid="nextButton"
          variation={ButtonVariation.PRIMARY}
          text={nextButtonTitle ? nextButtonTitle : 'Next'}
          onClick={() => onContinue(index + 1)}
          rightIcon={'chevron-right'}
          disabled={disableNext?.()}
        />
      )}
    </Layout.Horizontal>
  )
}
