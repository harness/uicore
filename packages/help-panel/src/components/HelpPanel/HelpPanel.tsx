/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Color } from '@harness/design-system'
import React from 'react'
import { useContentful } from '../../HelpPanelContext'
import { ContentType, IHelpPanel } from '../../types/contentfulTypes'
import HelpPanelContainer, { HelpPanelContainerType } from './HelpPanelContainer/HelpPanelContainer'
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
  let floatingBtnRef: HTMLButtonElement
  const {
    data = {
      backgroundColor: Color.WHITE,
      articles: []
    },
    loading
  } = useContentful<IHelpPanel>({
    referenceId,
    content_type: ContentType.helpPanel
  })

  if (!data) {
    return <></>
  }

  switch (type) {
    case HelpPanelType.FLOATING_CONTAINER:
      return (
        <HelpPanelContainer
          type={HelpPanelContainerType.FLOATING}
          ref={node => {
            floatingBtnRef = node
          }}>
          <HelpPanelContent
            data={data}
            isLoading={loading}
            onClose={() => {
              floatingBtnRef?.click()
            }}
          />
        </HelpPanelContainer>
      )
    case HelpPanelType.CONTENT_ONLY:
      return <HelpPanelContent data={data} isLoading={loading} onClose={props.onClose} />
    default:
      return (
        <HelpPanelContainer>
          <HelpPanelContent data={data} isLoading={loading} />
        </HelpPanelContainer>
      )
  }
}

export default HelpPanel
