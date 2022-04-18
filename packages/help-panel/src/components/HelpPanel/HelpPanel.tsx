/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { useContentful } from '../../HelpPanelContext'
import { ContentType, IHelpPanel } from '../../types/contentfulTypes'
import FloatingButton from '../FloatingButton/FloatingButton'
import HelpPanelContent from './HelpPanelContent'

export enum HelpPanelType {
  FIXED_LAYOUT = 'FIXED_LAYOUT'
}

interface HelpPanelProps {
  contentId: string
  type?: HelpPanelType
  options?: any
}

const HelpPanel: React.FC<HelpPanelProps> = props => {
  const { contentId, type } = props

  const { data, loading, hasError } = useContentful<IHelpPanel>({
    referenceId: contentId,
    content_type: ContentType.helpPanel
  })

  switch (type) {
    case HelpPanelType.FIXED_LAYOUT:
      return (
        <FloatingButton>
          <HelpPanelContent data={data} isLoading={loading} error={hasError} />
        </FloatingButton>
      )
    default:
      return <HelpPanelContent data={data} isLoading={loading} error={hasError} />
  }
}

export default HelpPanel
