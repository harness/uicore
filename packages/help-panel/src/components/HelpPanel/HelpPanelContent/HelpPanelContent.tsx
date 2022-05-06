/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color } from '@harness/design-system'
import Container from '../../Container'
import RenderComponent from '../../RenderComponent'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { IHelpPanel } from '../../../types/contentfulTypes'
import css from './HelpPanelContent.module.css'
import Skeleton from '../../Skeleton/Skeleton'

interface Props {
  data: IHelpPanel
  isLoading: boolean
  onClose?: () => void
}

export const HEADER_FOOTER_HEIGHT = 64
const HelpPanelContent: React.FC<Props> = ({ data, onClose, isLoading }) => {
  const { backgroundColor = Color.BLUE_50, title, articles } = data || {}

  const renderContent = () => {
    return (
      <>
        <Header title={title} onClose={onClose} />
        <Container
          className={css.centerContainer}
          padding={{ left: 'xlarge', right: 'xlarge' }}
          width="100%"
          style={{ top: HEADER_FOOTER_HEIGHT, height: `calc(100% - ${HEADER_FOOTER_HEIGHT * 2}px)` }}>
          {articles?.map(article => (
            <RenderComponent key={article.sys.id} data={article} />
          ))}
        </Container>
        <Footer />
      </>
    )
  }

  return (
    <Container background={backgroundColor} style={{ height: '100%' }}>
      {isLoading ? (
        <Container padding={{ top: 'xlarge', bottom: 'xlarge' }}>
          <Skeleton />
        </Container>
      ) : (
        renderContent()
      )}
    </Container>
  )
}
export default HelpPanelContent
