/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Position, PopoverInteractionKind, Popover } from '@blueprintjs/core'
import { useToaster } from '../..'
import { Icon } from '@harness/icons'

import css from './CopyToClipboard.css'

export interface CopyToClipboardProps {
  content: string
  showFeedback?: boolean
  iconSize?: number
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const { showSuccess } = useToaster()
  const getPopoverContent = (): JSX.Element => {
    return (
      <div className={css.popoverContent}>
        <span className={css.tooltipLabel}>Copy to Clipboard</span>
      </div>
    )
  }
  return (
    <>
      <Popover
        minimal
        position={Position.BOTTOM}
        interactionKind={PopoverInteractionKind.HOVER}
        content={getPopoverContent()}>
        <div>
          <Icon
            name="copy-alt"
            size={props.iconSize ?? 20}
            onClick={async (event: React.MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>) => {
              event.preventDefault()
              event.stopPropagation()
              navigator?.clipboard?.writeText(props?.content)
              if (props.showFeedback) {
                showSuccess('Successfully copied to clipboard')
              }
            }}
            className={css.copyIcon}
          />
        </div>
      </Popover>
    </>
  )
}
