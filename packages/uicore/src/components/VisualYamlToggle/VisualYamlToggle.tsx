/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { IconName } from '@harnessio/icons'
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
