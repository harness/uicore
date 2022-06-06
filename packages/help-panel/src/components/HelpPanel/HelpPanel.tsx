/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Error, HelpPanelContext } from '../../HelpPanelContext'
import DefaultContainer from './Containers/DefaultContainer/DefaultContainer'
import FloatingContainer from './Containers/FloatingContainer/FloatingContainer'
import HelpPanelContent from './HelpPanelContent/HelpPanelContent'

export enum HelpPanelType {
  FLOATING_CONTAINER = 'FLOATING_CONTAINER',
  CONTENT_ONLY = 'CONTENT_ONLY'
}

interface HelpPanelProps {
  referenceId: string
  type?: HelpPanelType
  onClose?: () => void
}

const HelpPanel: React.FC<HelpPanelProps> = props => {
  const { referenceId, type } = props
  let floatingBtnRef = React.useRef<HTMLButtonElement | null>(null)

  const { error } = React.useContext(HelpPanelContext)

  if (error === Error.ERROR_INITIALIZING_CONTENTFUL) {
    return null
  }

  switch (type) {
    case HelpPanelType.FLOATING_CONTAINER:
      return (
        <FloatingContainer ref={floatingBtnRef}>
          <HelpPanelContent
            referenceId={referenceId}
            onClose={() => {
              floatingBtnRef.current?.click()
            }}
          />
        </FloatingContainer>
      )
    case HelpPanelType.CONTENT_ONLY:
      return <HelpPanelContent referenceId={referenceId} onClose={props.onClose} />
    default:
      return (
        <DefaultContainer>
          <HelpPanelContent referenceId={referenceId} />
        </DefaultContainer>
      )
  }
}

export default HelpPanel
