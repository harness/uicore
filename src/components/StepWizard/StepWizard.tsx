import React, { MutableRefObject } from 'react'
import cx from 'classnames'
import css from './StepWizard.css'
import { Icon, IconName, IconProps } from '../../icons/Icon'
import { Text } from '../../components/Text/Text'
import { romanize } from '../../core/Utils'
import { isNil } from 'lodash-es'

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
  isLastStepCompleted?: boolean
}

export interface StepProps<SharedObject> {
  name?: string | JSX.Element
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
  stepNames?: string[]
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
        prevStepData,
        completedStep: undefined
      }))
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
      const stepNames: string[] = []
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
            stepNames.push((nested && nested.props && nested.props.name) || `Step ${i + 1}-${j + 1}`)
          })
        } else {
          stepIndex++
          nestedStepWizard.push({ stepIndex })
          steps.push(child as React.ReactElement<StepProps<SharedObject>>)
          stepNames.push((child && child.props && child.props.name) || `Step ${i + 1}`)
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
                  <div style={{ gridColumn: '1/ span 2', color: 'var(--white)' }}>
                    {state.nestedStepWizard?.[index]?.wizard?.props?.title}
                  </div>
                </>
              )}
              {completedSteps ? (
                <span className={css.completedIcon}>
                  <Icon name="small-tick" size={20} color="grey200" />
                </span>
              ) : (
                <>{typeof stepName === 'string' && <span className={css.number}>{stepIndex}</span>}</>
              )}
              <Text className={css.stepName} lineClamp={2} width={240}>
                {stepName}
              </Text>
              {!isNestedFirstStep && state.nestedStepWizard?.[index]?.stepIndex === 1 ? (
                <Text className={css.stepName} lineClamp={2} width={240}>
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
    completedStep
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
    </div>
  )
}
