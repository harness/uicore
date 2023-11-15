/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useCallback, useMemo } from 'react'
import cx from 'classnames'
import { FontVariation } from '@harness/design-system'
import { HelpPanel, HelpPanelType } from '@harness/help-panel'
import type { StepPropsInterface, StepStatusType } from './Step.types'
import { StepTitle } from './components/StepTitle/StepTitle'
import { StepNavButtons } from './components/StepNavButtons/StepNavButtons'
import { StepStatus } from './Step.constants'
import { getStepStatus, getTitleStatus } from './Step.utils'
import { Container, Card, Text } from '../../../../'
import css from './Step.css'

const Step = ({
  stepList,
  selectedStepId,
  isStepValid,
  step,
  index,
  onStepChange,
  setSelectedStepId,
  runValidationOnMount,
  isOptional,
  hideTitleWhenActive
}: StepPropsInterface): JSX.Element => {
  const selectedStepIndex = stepList.map(item => item.id).indexOf(selectedStepId || '')
  const [stepStatus, setStepStatus] = useState<StepStatusType>(
    step.disabled ? StepStatus.DISABLED : StepStatus.INCONCLUSIVE
  )
  const isLastStep = selectedStepIndex === stepList.length - 1
  const isCurrentStep = selectedStepIndex === index
  const { id, panel, preview, helpPanelReferenceId } = step

  const onTitleClick = useCallback(
    (titleIndex: number): void => {
      setSelectedStepId(stepList[titleIndex].id)
      onStepChange?.(stepList[titleIndex].id)
    },
    [onStepChange, setSelectedStepId, stepList]
  )

  const onContinue = useCallback(
    (selectedIndex: number, skipValidation = false): void => {
      const validStatus = !!isStepValid?.(step.id)
      if (validStatus || skipValidation) {
        setSelectedStepId(stepList[selectedIndex].id)
        onStepChange?.(stepList[selectedIndex].id)
      }
      if (!step.disabled) {
        setStepStatus(getStepStatus(validStatus))
      }
    },
    [isStepValid, onStepChange, setSelectedStepId, step.id, stepList]
  )

  const stepTitleStatus = useMemo(
    () =>
      getTitleStatus({
        stepId: step.id,
        currentStepStatus: stepStatus,
        runValidationOnMount: Boolean(runValidationOnMount),
        isCurrentStep,
        isStepValid,
        isDisabled: step.disabled
      }),
    [isStepValid, isCurrentStep, runValidationOnMount, step.id, stepStatus]
  )

  const isErrorMessageVisible = stepTitleStatus === StepStatus.ERROR
  const isPreviewVisible = useMemo(
    () => (step.disabled ? step.disabled : selectedStepIndex > index && step.preview && !isErrorMessageVisible),
    [index, selectedStepIndex, step.disabled, step.preview, isErrorMessageVisible]
  )

  const isNextStepDisabled = stepList[index + 1]?.disabled
  const isPreviousStepDisabled = stepList[index - 1]?.disabled

  return (
    <Container className={cx(css.stepContainer, index === stepList.length - 1 && css.bottomMargin)}>
      <StepTitle
        step={step}
        index={index}
        isCurrent={isCurrentStep}
        stepStatus={stepTitleStatus}
        onClick={onTitleClick}
        isOptional={isOptional}
        hideTitle={isCurrentStep ? hideTitleWhenActive : false}
      />

      {step.subTitle && (
        <Container className={cx(css.alignContainerRight, css.borderLeft, css.stepSubtitle)}>
          <Text font={{ variation: FontVariation.FORM_LABEL }}>{step.subTitle}</Text>
        </Container>
      )}
      <Container
        data-testid={`step_container_${id}`}
        className={cx(css.alignContainerRight, {
          [css.borderLeft]: index !== stepList.length - 1 || isLastStep,
          [css.stepMargin]: isCurrentStep || isErrorMessageVisible || isPreviewVisible
        })}>
        {isPreviewVisible && (
          <Container data-testid={`preview_${id}`} width={500}>
            <>{preview}</>
          </Container>
        )}
        {(isCurrentStep || isErrorMessageVisible) && (
          <Container>
            {isErrorMessageVisible && (
              <>
                {!step.errorMessage?.length ? (
                  <Text margin={{ bottom: isCurrentStep ? 'large' : '' }} intent="danger">
                    Required fields are missing or have incorrect data
                  </Text>
                ) : (
                  step.errorMessage?.map((error, errorIndex) => {
                    return (
                      <Text key={errorIndex} margin={{ bottom: isCurrentStep ? 'large' : 'small' }} intent="danger">
                        {error}
                      </Text>
                    )
                  })
                )}
              </>
            )}
            {isCurrentStep && !step.disabled && (
              <>
                <Card data-testid={`panel_${id}`} className={css.card}>
                  {panel}
                </Card>
                <StepNavButtons
                  index={index}
                  onContinue={onContinue}
                  isLastStep={isLastStep}
                  nextButtonTitle={step.nextButtonTitle}
                  disableNext={step?.disableNext}
                  isNextStepDisabled={isNextStepDisabled}
                  isPreviousStepDisabled={isPreviousStepDisabled}
                />
              </>
            )}
          </Container>
        )}
      </Container>
      {isCurrentStep && helpPanelReferenceId && (
        <HelpPanel referenceId={helpPanelReferenceId} type={HelpPanelType.FLOATING_CONTAINER} />
      )}
    </Container>
  )
}

export default Step
