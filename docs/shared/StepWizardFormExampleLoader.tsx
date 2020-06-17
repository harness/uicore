import dynamic from 'next/dynamic'

export const FormExampleStepWizard = dynamic(
  () => import('./StepWizardFormExample').then(m => m.FormExampleStepWizard),
  {
    ssr: false
  }
)
