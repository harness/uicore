/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color } from '@harness/design-system'
import Container from '../Container'
import RenderComponent from '../RenderComponent'
import Header from './Header'
import Footer from './Footer'
import { IHelpPanel } from '../../types/contentfulTypes'

interface Props {
  data: IHelpPanel
  isLoading: boolean
  onClose?: () => void
}

export const HEADER_FOOTER_HEIGHT = '64px'
const HelpPanelContent: React.FC<Props> = ({ data, isLoading, onClose }) => {
  const { backgroundColor = Color.BLUE_50, title, articles } = data || {}

  const renderContent = () => {
    if (isLoading) {
      return 'Loading ...'
    }

    return (
      <>
        <Header title={title} onClose={onClose} />
        <Container>
          {articles?.map(article => (
            <RenderComponent key={article.sys.id} data={article} />
          ))}
        </Container>
        <Footer />
      </>
    )
  }

  return (
    <Container background={backgroundColor} padding={{ left: 'xlarge', right: 'xlarge' }} style={{ minHeight: '100%' }}>
      {renderContent()}
    </Container>
  )
}
export default HelpPanelContent
