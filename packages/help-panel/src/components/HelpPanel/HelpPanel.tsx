/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import { useContentful } from '../../HelpPanelContext'
import { ContentType, IHelpPanel } from '../../types/contentfulTypes'
import Container from '../Container'
import RenderComponent from '../RenderComponent'
import Header from './Header'
import Footer from './Footer'
import floating_button from '../../icons/floating_button.svg'

export enum HelpPanelType {
  FIXED_LAYOUT = 'FIXED_LAYOUT'
}

interface HelpPanelProps {
  contentId: string
  type?: HelpPanelType
  options?: any //remove any
}

interface HelpPanelContentProps {
  articles: IHelpPanel['articles']
}

const getFixedContainerStyle = () => {
  return {
    minHeight: '500px',
    width: '400px',
    boxShadow: '0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)'
  }
}

const getPositionStyle = () => {
  return {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
    zIndex: 1000
  }
}

// @ts-ignore
const HelpPanelContent: React.FC<HelpPanelContentProps> = ({ articles }) => {
  return articles?.map(article => <RenderComponent key={article.sys.id} data={article} />)
}

const HelpPanel: React.FC<HelpPanelProps> = props => {
  const { contentId, type } = props
  const [showPanel, setShowPanel] = useState<boolean>()

  const { data, loading } = useContentful<IHelpPanel>({
    referenceId: contentId,
    content_type: ContentType.helpPanel
  })

  const { articles = [], backgroundColor, title } = data || {}

  if (loading) {
    // Need a loading screen for help panel
    return <div>Loading content ...</div>
  }

  const getContainerProps = () => {
    return {
      background: backgroundColor,
      padding: { left: 'xlarge', right: 'xlarge' }
    }
  }

  switch (type) {
    case HelpPanelType.FIXED_LAYOUT:
      return (
        //@ts-ignore
        <Container style={getPositionStyle()}>
          {showPanel ? (
            <Container {...getContainerProps()} style={getFixedContainerStyle()}>
              <Header
                title={title}
                onClose={() => {
                  setShowPanel(false)
                }}
              />
              <HelpPanelContent articles={articles} />
              <Footer />
            </Container>
          ) : undefined}
          <Container
            onClick={() => {
              setShowPanel(!showPanel)
            }}
            style={{
              background: `transparent url(${floating_button})`,
              height: '56px',
              width: '56px',
              cursor: 'pointer',
              position: 'absolute',
              right: '-70px',
              bottom: '-40px'
            }}
          ></Container>
        </Container>
      )
    default:
      return (
        <Container {...getContainerProps()}>
          <HelpPanelContent articles={articles} />
        </Container>
      )
  }
}

export default HelpPanel
