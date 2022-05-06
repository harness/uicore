/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Entry } from 'contentful'
import Article from './Article/Article'
import { ComponentValue, ContentType } from '../types/contentfulTypes'
import Image from './Image/Image'
import YoutubeVideo from './YoutubeVideo/YoutubeVideo'

interface RenderComponentProps {
  data: Entry<ComponentValue>
}

type RenderComponentType = Exclude<ContentType, 'document' | 'helpPanel' | 'contentIdMap'>

const componentMap: Record<RenderComponentType, any> = {
  [ContentType.article]: Article,
  [ContentType.image]: Image,
  [ContentType.youtubeVideo]: YoutubeVideo
}

const RenderComponent: React.FC<RenderComponentProps> = props => {
  const { data } = props
  const ComponentToRender = componentMap[data.sys.contentType.sys.id as RenderComponentType]

  return ComponentToRender ? <ComponentToRender {...data.fields} /> : <div>Component not found</div>
}

export default RenderComponent
