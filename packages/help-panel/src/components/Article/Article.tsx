/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES, Text } from '@contentful/rich-text-types'
import { FontVariation, Color } from '@harness/design-system'
import type { IArticle } from '../../types/contentfulTypes'
import Container from '../Container'
import RenderComponent from '../RenderComponent'
import css from './Article.module.css'

const Article: React.FC<IArticle> = (props: IArticle) => {
  const { title, description, body } = props

  return (
    <Container className={css.container}>
      <Container font={{ variation: FontVariation.H4 }} color={Color.PRIMARY_9} margin={{ bottom: 'medium' }}>
        {title}
      </Container>
      {description
        ? documentToReactComponents(description, {
            renderNode: {
              // eslint-disable-next-line react/display-name
              [INLINES.HYPERLINK]: node => {
                return (
                  <a href={node.data.uri} target={'_blank'} rel="noreferrer">
                    {(node.content[0] as Text).value}
                  </a>
                )
              }
            }
          })
        : undefined}
      {body?.map(item => (
        <RenderComponent key={item.sys.id} data={item} />
      ))}
    </Container>
  )
}

export default Article
