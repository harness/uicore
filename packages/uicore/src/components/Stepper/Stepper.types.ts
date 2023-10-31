/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

export interface StepDetailsInterface {
  id: string
  title: string
  subTitle?: string
  panel: React.ReactElement
  preview?: React.ReactElement
  isOptional?: boolean
  helpPanelReferenceId?: string
  errorMessage?: string[]
  nextButtonTitle?: string
  disableNext?: () => boolean
}

export interface StepperProps {
  id: string
  stepList: StepDetailsInterface[]
  onStepChange?: (id: string) => void
  isStepValid?: (selectedTabId: string) => boolean
  runValidationOnMount?: boolean
  hideTitleWhenActive?: boolean
  activeStepId?: string
}
