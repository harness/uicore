import React, { SetStateAction, Dispatch } from 'react'
import { PillToggle, PillToggleProps } from '../PillToggle/PillToggle'

export enum VisualYamlSelectedView {
  VISUAL = 'VISUAL',
  YAML = 'YAML'
}

export interface VisualYamlToggleProps {
  initialSelectedView?: VisualYamlSelectedView
  beforeOnChange: (val: VisualYamlSelectedView, callbackFn: Dispatch<SetStateAction<VisualYamlSelectedView>>) => void
  disableYaml?: boolean
  className?: string
  labels?: {
    visual?: string
    yaml?: string
  }
}

export function VisualYamlToggle(props: VisualYamlToggleProps): JSX.Element {
  const { initialSelectedView, beforeOnChange, disableYaml = false, className = '', labels } = props

  const toggleProps: PillToggleProps<VisualYamlSelectedView> = {
    initialSelectedView,
    options: [
      {
        label: labels?.visual || 'VISUAL',
        value: VisualYamlSelectedView.VISUAL
      },
      {
        label: labels?.yaml || 'YAML',
        value: VisualYamlSelectedView.YAML
      }
    ],
    beforeOnChange,
    disableSwitch: disableYaml,
    className
  }

  return <PillToggle {...toggleProps} />
}
