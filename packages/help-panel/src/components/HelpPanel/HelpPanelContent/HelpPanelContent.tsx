/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color } from '@harness/design-system'
import Container from '../../Container'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { IHelpPanel, ContentType } from '../../../types/contentfulTypes'
import css from './HelpPanelContent.module.css'
import Skeleton from '../../Skeleton/Skeleton'
import Article from '../../Article/Article'
import { useContentful } from '../../../HelpPanelContext'
import ErrorScreen from '../ErrorScreen/ErrorScreen'

interface Props {
  referenceId: string
  onClose?: () => void
}

export const HEADER_FOOTER_HEIGHT = 64
const HelpPanelContent: React.FC<Props> = ({ onClose, referenceId }) => {
  const { data, loading, error } = useContentful<IHelpPanel>({
    referenceId,
    content_type: ContentType.helpPanel
  })

  const { articles, title, backgroundColor = Color.BLUE_50 } = data || {}

  const renderContent = () => {
    return (
      <>
        <Header title={title} onClose={onClose} />
        {!error || articles?.length === 0 ? (
          <Container
            className={css.centerContainer}
            padding={{ left: 'xlarge', right: 'xlarge' }}
            width="100%"
            style={{ top: HEADER_FOOTER_HEIGHT, height: `calc(100% - ${HEADER_FOOTER_HEIGHT * 2}px)` }}>
            {articles?.map(article => (
              <Article key={article.sys.id} {...article.fields} />
            ))}
          </Container>
        ) : (
          <ErrorScreen />
        )}

        <Footer />
      </>
    )
  }

  return (
    <Container background={backgroundColor} style={{ height: '100%' }}>
      {loading ? (
        <Container padding="xlarge">
          <Skeleton />
        </Container>
      ) : (
        renderContent()
      )}
    </Container>
  )
}
export default HelpPanelContent
