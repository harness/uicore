/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import type { StepperProps } from './Stepper.types'
import Step from './components/Step/Step'
import { Layout } from '../..'

export const StepperContext = React.createContext<StepperProps>({ id: '', stepList: [] })

export const Stepper = (props: React.PropsWithChildren<StepperProps>): React.ReactElement => {
  const { stepList, isStepValid, onStepChange, runValidationOnMount, hideTitleWhenActive, activeStepId } = props
  const [selectedStepId, setSelectedStepId] = useState(() => activeStepId || stepList[0]?.id)
  return (
    <StepperContext.Provider value={{ ...props }}>
      <Layout.Vertical margin="xlarge" data-testid="Stepper_main">
        {stepList?.map((step, index) => {
          return (
            <Step
              key={step.id}
              step={step}
              index={index}
              stepList={stepList}
              selectedStepId={selectedStepId}
              isStepValid={isStepValid}
              setSelectedStepId={setSelectedStepId}
              onStepChange={onStepChange}
              runValidationOnMount={runValidationOnMount}
              isOptional={step.isOptional}
              hideTitleWhenActive={hideTitleWhenActive}
            />
          )
        })}
      </Layout.Vertical>
    </StepperContext.Provider>
  )
}
