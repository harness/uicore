/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { MutableRefObject } from 'react'
import cx from 'classnames'
import css from './StepWizard.css'
import { Icon, IconName, IconProps } from '@harness/icons'
import { Text } from '../../components/Text/Text'
import { romanize } from '../../core/Utils'
import { isNil } from 'lodash-es'
import { Color } from '@harness/design-system'

interface StepChangeData<SharedObject> {
  prevStep: number
  nextStep: number
  prevStepData: SharedObject
}

export type GotoStepArgs<SharedObject> =
  | {
      stepNumber: number
      stepIdentifier?: never
      prevStepData?: SharedObject
    }
  | {
      stepNumber?: never
      stepIdentifier: string
      prevStepData?: SharedObject
    }
export interface StepWizardProps<SharedObject> {
  icon?: IconName
  iconProps?: Omit<IconProps, 'name'>
  title?: string | JSX.Element
  subtitle?: string | JSX.Element
  children:
    | Array<React.ReactElement<StepProps<SharedObject>> | null>
    | React.ReactElement<StepWizardProps<SharedObject>>
  isNavMode?: boolean
  className?: string
  stepClassName?: string
  navClassName?: string
  onStepChange?: (data: StepChangeData<SharedObject | undefined>) => void
  onCompleteWizard?: (data: SharedObject | undefined) => void
  initialStep?: number
}

interface StepName {
  stepName: string
  stepSubTitle: string
}
export interface StepProps<SharedObject> {
  name?: string | JSX.Element
  subTitle?: string | JSX.Element
  identifier?: string
  children?: React.ReactElement<StepWizardProps<SharedObject>> | React.ReactNode
  // These props will be passed by wizard
  prevStepData?: SharedObject
  currentStep?: () => number
  totalSteps?: () => number
  nextStep?: (prevStepData?: SharedObject) => void
  previousStep?: (prevStepData?: SharedObject) => void
  gotoStep?: (args: GotoStepArgs<SharedObject>) => boolean
  firstStep?: (prevStepData?: SharedObject) => void
  lastStep?: (prevStepData?: SharedObject) => void
  completedStep?: (step: number) => void
  getCurrentStepData?: MutableRefObject<undefined | (() => SharedObject)>
}

interface StepState<SharedObject> {
  activeStep: number
  prevStep: number
  nestedStepWizard?: Array<{
    wizard?: React.ReactElement<StepWizardProps<SharedObject> | null>
    stepIndex: number
  }>
  prevStepData?: SharedObject
  children?: Array<React.ReactElement<StepProps<SharedObject>>>
  stepNames?: StepName[]
  totalSteps: number
  completedStep?: number
}

// builds step identifier to step number map
// recursive in nature to support nested wizards
const createStepIdentifierToStepNumberMap = <SharedObject,>(
  steps: StepWizardProps<SharedObject>['children'],
  include: boolean,
  stepIdentifierToStepNumberMap: MutableRefObject<Record<string, number>>,
  currentStepNumber: MutableRefObject<number>
) => {
  if (!steps) {
    return
  }
  React.Children.map(steps, step => {
    if (include) {
      const stepIdentifier = step?.props?.identifier || step?.props?.name
      if (stepIdentifier && typeof stepIdentifier === 'string') {
        currentStepNumber.current++
        stepIdentifierToStepNumberMap.current[stepIdentifier] = currentStepNumber.current
      }
    }
    createStepIdentifierToStepNumberMap(
      step?.props.children as StepWizardProps<SharedObject>['children'],
      step?.type === StepWizard,
      stepIdentifierToStepNumberMap,
      currentStepNumber
    )
  })
}

export function StepWizard<SharedObject = Record<string, unknown>>(
  props: StepWizardProps<SharedObject>
): React.ReactElement {
  const {
    className = '',
    isNavMode = true,
    initialStep = 1,
    children,
    stepClassName = '',
    navClassName = '',
    icon = '',
    iconProps,
    title = '',
    subtitle = ''
  } = props
  const stepIdentifierToStepNumberMap = React.useRef<Record<string, number>>({})
  const currentStepNumber = React.useRef<number>(0)
  const getCurrentStepData = React.useRef<() => SharedObject>()
  React.useEffect(() => {
    stepIdentifierToStepNumberMap.current = {}
    currentStepNumber.current = 0
    createStepIdentifierToStepNumberMap<SharedObject>(
      props.children,
      true,
      stepIdentifierToStepNumberMap,
      currentStepNumber
    )
  }, [props.children])
  const [state, setState] = React.useState<StepState<SharedObject>>({
    activeStep: Array.isArray(children) && (initialStep < 1 || initialStep > children.length) ? 1 : initialStep,
    totalSteps: 0,
    prevStep: -1,
    completedStep: undefined
  })
  const gotoStep = React.useCallback(
    (args: GotoStepArgs<SharedObject>) => {
      const { stepNumber: stepNumberArg, stepIdentifier, prevStepData } = args
      const stepNumber = stepIdentifier
        ? stepIdentifierToStepNumberMap.current[stepIdentifier]
        : (stepNumberArg as number)
      if (state.activeStep === stepNumber) {
        return true
      }
      const stepData = state.nestedStepWizard?.[state.prevStep]
      const currentStepData = getCurrentStepData.current?.() || ({} as SharedObject)
      const nestedWizard = stepData?.wizard
      if (
        !isNil(nestedWizard) &&
        nestedWizard &&
        nestedWizard.props?.onCompleteWizard &&
        stepData?.stepIndex === React.Children.toArray(nestedWizard.props.children as any).length
      ) {
        nestedWizard.props.onCompleteWizard(prevStepData)
      } else if (
        props.onCompleteWizard &&
        state.totalSteps > 0 &&
        stepNumber > 1 &&
        stepNumber === state.totalSteps + 1
      ) {
        props.onCompleteWizard(prevStepData)
        return true
      } else if (!stepNumber || stepNumber > state.totalSteps || stepNumber < 1) {
        // Not a valid step stepNumber
        return false
      }
      setState(prevState => ({
        ...prevState,
        prevStep: prevState.activeStep,
        activeStep: stepNumber,
        prevStepData: {
          ...prevStepData,
          ...currentStepData
        },
        completedStep: undefined
      }))
      // clear the ref so that current ref is not maintained for next step
      getCurrentStepData.current = undefined
      return true
    },
    [state.activeStep, state.totalSteps, state.prevStep, state.nestedStepWizard]
  )

  React.useEffect(() => {
    const stepData = state.nestedStepWizard?.[state.prevStep - 1]
    const nestedWizard = stepData?.wizard
    if (!isNil(nestedWizard) && nestedWizard && nestedWizard.props?.onStepChange) {
      const stepIndex = stepData?.stepIndex ?? 1
      const stepDif = state.activeStep - state.prevStep
      nestedWizard.props.onStepChange({
        prevStep: stepIndex,
        nextStep: stepIndex + stepDif,
        prevStepData: state.prevStepData
      })
    } else if (props.onStepChange && state.prevStep !== -1) {
      props.onStepChange({ prevStep: state.prevStep, nextStep: state.activeStep, prevStepData: state.prevStepData })
    }
  }, [state.prevStep, state.activeStep, state.prevStepData])

  const currentStep = React.useCallback(() => {
    return state.activeStep
  }, [state.activeStep])
  const totalSteps = React.useCallback(() => {
    return state.totalSteps
  }, [state.activeStep])
  const nextStep = React.useCallback(
    (prevStepData?: SharedObject) => {
      gotoStep({ stepNumber: state.activeStep + 1, prevStepData })
    },
    [gotoStep]
  )
  const previousStep = React.useCallback(
    (prevStepData?: SharedObject) => {
      gotoStep({ stepNumber: state.activeStep - 1, prevStepData })
    },
    [gotoStep]
  )
  const firstStep = React.useCallback(
    (prevStepData?: SharedObject) => {
      gotoStep({ stepNumber: 1, prevStepData })
    },
    [gotoStep]
  )
  const lastStep = React.useCallback(
    (prevStepData?: SharedObject) => {
      gotoStep({ stepNumber: state.totalSteps, prevStepData })
    },
    [gotoStep]
  )
  const completedStep = React.useCallback((step: number) => {
    setState(prevState => ({ ...prevState, completedStep: step }))
  }, [])

  React.useLayoutEffect(() => {
    if (Array.isArray(props.children)) {
      const propsChild = React.Children.toArray(props.children) as React.ReactElement[]
      const steps: Array<React.ReactElement<StepProps<SharedObject>>> = []
      const stepNames: StepName[] = []
      let stepIndex = 0
      const nestedStepWizard: StepState<SharedObject>['nestedStepWizard'] = []
      propsChild.forEach((child, i: number) => {
        if (
          child?.type === StepWizard ||
          (child?.props?.children as React.ReactElement<StepWizardProps<SharedObject>>)?.type === StepWizard
        ) {
          let nestedStepWizardChild = child as React.ReactElement<StepWizardProps<SharedObject>>

          if ((child?.props?.children as React.ReactElement<StepWizardProps<SharedObject>>)?.type === StepWizard) {
            nestedStepWizardChild = child?.props?.children as React.ReactElement<StepWizardProps<SharedObject>>
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nestedChild = React.Children.toArray(
            nestedStepWizardChild.props.children as any
          ) as React.ReactElement[]
          nestedChild.forEach((nested, j: number) => {
            steps.push(nested as React.ReactElement<StepProps<SharedObject>>)
            nestedStepWizard.push({ wizard: nestedStepWizardChild, stepIndex: j + 1 })

            stepNames.push({
              stepName: (nested && nested.props && nested.props.name) || `Step ${i + 1}-${j + 1}`,
              stepSubTitle: (nested && nested.props && nested.props.subTitle) || ''
            })
          })
        } else {
          stepIndex++
          nestedStepWizard.push({ stepIndex })
          steps.push(child as React.ReactElement<StepProps<SharedObject>>)
          stepNames.push({
            stepName: (child && child.props && child.props.name) || `Step ${i + 1}`,
            stepSubTitle: (child && child.props && child.props.subTitle) || ''
          })
        }
      })
      setState(prevState => ({
        ...prevState,
        stepNames,
        totalSteps: stepNames.length,
        children: steps,
        nestedStepWizard,
        completedStep: undefined
      }))
    }
  }, [children])

  const renderStep = () => (
    <React.Fragment>
      {state.stepNames &&
        state.stepNames.map((stepName, index) => {
          const activeStep = index + 1 === state.activeStep
          const completedSteps = state.activeStep > index + 1 || state.completedStep == index
          const isNestedStep = isNil(state.nestedStepWizard?.[index]?.wizard) ? false : true
          const stepIndex = isNestedStep
            ? romanize(state.nestedStepWizard?.[index]?.stepIndex || 0, true)
            : state.nestedStepWizard?.[index]?.stepIndex
          const isNestedFirstStep = isNestedStep ? state.nestedStepWizard?.[index]?.stepIndex === 1 : false
          return (
            <div
              key={index}
              onClick={() => completedSteps && gotoStep({ stepNumber: index + 1, prevStepData: state.prevStepData })}
              className={cx(
                css.navStep,
                navClassName,
                { [css.activeStep]: activeStep },
                { [css.completedStep]: completedSteps },
                { [css.nestedStep]: isNestedStep }
              )}>
              {isNestedFirstStep && state.nestedStepWizard?.[index]?.wizard?.props?.title && (
                <>
                  <div style={{ gridColumn: '1/ span 2', color: 'var(--grey-50)', marginBottom: 'var(--spacing-6)' }}>
                    {state.nestedStepWizard?.[index]?.wizard?.props?.title}
                  </div>
                </>
              )}
              {completedSteps ? (
                <span className={css.completedIcon}>
                  <Icon name="small-tick" size={20} color={Color.PRIMARY_7} />
                </span>
              ) : (
                <>{typeof stepName.stepName === 'string' && <span className={css.number}>{stepIndex}</span>}</>
              )}

              <Text className={css.stepName} lineClamp={2} width={200}>
                {stepName.stepName}
              </Text>
              {stepName.stepSubTitle ? (
                <Text
                  className={cx(
                    css.stepName,
                    typeof stepName.stepSubTitle === 'string' && typeof stepName.stepName === 'string'
                      ? css.stepSubTitleString
                      : css.stepSubTitle
                  )}
                  lineClamp={2}
                  width={200}>
                  {stepName.stepSubTitle}
                </Text>
              ) : null}
              {!isNestedFirstStep && state.nestedStepWizard?.[index]?.stepIndex === 1 ? (
                <Text className={css.stepName} lineClamp={2} width={200}>
                  {subtitle}
                </Text>
              ) : null}
            </div>
          )
        })}
    </React.Fragment>
  )

  const activeChild = state.children?.[state.activeStep - 1] || <div />

  const childProps: StepProps<SharedObject> = {
    currentStep,
    totalSteps,
    prevStepData: state.prevStepData,
    nextStep: nextStep,
    previousStep,
    gotoStep,
    firstStep,
    lastStep,
    completedStep,
    getCurrentStepData
  }

  return (
    <div className={cx(css.main, className, { [css.navBar]: isNavMode })}>
      {isNavMode && (
        <div className={css.navBarList}>
          {icon ? (
            <span className={css.header}>
              <Icon name={icon} {...iconProps} />
            </span>
          ) : null}
          {title ? (
            typeof title === 'string' ? (
              <span className={cx(css.title, css.header)}>{title}</span>
            ) : (
              title
            )
          ) : null}
          {renderStep()}
        </div>
      )}
      {state.activeStep && (
        <div className={cx(css.stepDetails, stepClassName)}> {React.cloneElement(activeChild, childProps)}</div>
      )}
      <Icon name="harness-with-color" className={css.harnessWatermark} size={346} color={Color.GREY_50} />
    </div>
  )
}
