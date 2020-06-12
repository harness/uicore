import dynamic from 'next/dynamic'

export const ExampleWizard = dynamic(() => import('./StepWizardExample').then(m => m.ExampleWizard), {
  ssr: false
})
