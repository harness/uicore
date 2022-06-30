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
import { useContentful } from '../../HelpPanelContext'
import { ContentType, IHelpPanel } from '../../types/contentfulTypes'

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
  const floatingBtnRef = React.useRef<HTMLButtonElement | null>(null)

  const { error: initialError } = React.useContext(HelpPanelContext)

  if (initialError === Error.ERROR_INITIALIZING_CONTENTFUL) {
    return null
  }

  const { data, loading, error } = useContentful<IHelpPanel>({
    referenceId,
    // eslint-disable-next-line camelcase
    content_type: ContentType.helpPanel
  })

  switch (type) {
    case HelpPanelType.FLOATING_CONTAINER:
      return (
        <FloatingContainer ref={floatingBtnRef}>
          <HelpPanelContent
            data={data}
            error={error}
            loading={loading}
            onClose={() => {
              floatingBtnRef.current?.click()
            }}
          />
        </FloatingContainer>
      )
    case HelpPanelType.CONTENT_ONLY:
      return <HelpPanelContent data={data} error={error} loading={loading} onClose={props.onClose} />
    default:
      return (
        <DefaultContainer>
          <HelpPanelContent data={data} error={error} loading={loading} />
        </DefaultContainer>
      )
  }
}

export default HelpPanel
