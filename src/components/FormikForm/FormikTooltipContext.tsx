import { createContext } from 'react'

interface FormikTooltipContextInterface {
  formName?: string
}

export const FormikTooltipContext = createContext<FormikTooltipContextInterface>({})
