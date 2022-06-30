/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { IconName } from '@harness/icons'
import { PillToggle, PillToggleProps } from '../PillToggle/PillToggle'

export enum VisualYamlSelectedView {
  VISUAL = 'VISUAL',
  YAML = 'YAML'
}

export interface VisualYamlToggleProps {
  selectedView: VisualYamlSelectedView
  onChange: (val: VisualYamlSelectedView) => void
  disableToggle?: boolean
  className?: string
  labels?: {
    visual?: string
    yaml?: string
  }
  disableToggleReasonIcon?: IconName
  showDisableToggleReason?: boolean
  disableToggleReasonContent?: React.ReactElement
}

export function VisualYamlToggle(props: VisualYamlToggleProps): JSX.Element {
  const { selectedView, onChange, disableToggle = false, className = '', labels, ...restProps } = props

  const toggleProps: PillToggleProps<VisualYamlSelectedView> = {
    selectedView,
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
    onChange,
    disableToggle,
    className,
    ...restProps
  }

  return <PillToggle {...toggleProps} />
}
