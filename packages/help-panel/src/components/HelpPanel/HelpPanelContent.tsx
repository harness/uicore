/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import Container from '../Container'
import RenderComponent from '../RenderComponent'
import Header from './Header'
import Footer from './Footer'
import { IHelpPanel } from '../../types/contentfulTypes'

interface Props {
  data?: IHelpPanel
  isLoading: boolean
  error: boolean
}

export const HEADER_FOOTER_HEIGHT = '64px'
const HelpPanelContent: React.FC<Props> = ({ data, isLoading, error }) => {
  const { backgroundColor, title, articles } = data || {}

  if (error) {
    return <>Error rendering help panel</>
  }

  return (
    <Container background={backgroundColor} padding={{ left: 'xlarge', right: 'xlarge' }}>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Header title={title} />
          <Container>
            {articles?.map(article => (
              <RenderComponent key={article.sys.id} data={article} />
            ))}
          </Container>
          <Footer />
        </>
      )}
    </Container>
  )
}
export default HelpPanelContent
