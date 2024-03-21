/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import type { StepNavButtonsInterface } from './StepNavButtons.types'
import { Button, Layout, ButtonVariation } from '../../../../../../'

export const StepNavButtons = ({
  index,
  isLastStep,
  onContinue,
  nextButtonTitle,
  disableNext,
  isNextStepDisabled,
  isPreviousStepDisabled
}: StepNavButtonsInterface): JSX.Element => {
  return (
    <Layout.Horizontal spacing="small" padding={{ top: 'xlarge' }}>
      {index > 0 && (
        <Button
          data-testid="backButton"
          variation={ButtonVariation.SECONDARY}
          onClick={() => onContinue(isPreviousStepDisabled ? index - 2 : index - 1, true)}
          icon={'chevron-left'}>
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button
          data-testid="nextButton"
          variation={ButtonVariation.PRIMARY}
          text={nextButtonTitle ? nextButtonTitle : 'Next'}
          onClick={() => onContinue(isNextStepDisabled ? index + 2 : index + 1)}
          rightIcon={'chevron-right'}
          disabled={disableNext?.()}
        />
      )}
    </Layout.Horizontal>
  )
}
