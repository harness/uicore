/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { Position, PopoverInteractionKind, Popover } from '@blueprintjs/core'
import { useToaster } from '../..'
import { Icon } from '@harnessio/icons'

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
