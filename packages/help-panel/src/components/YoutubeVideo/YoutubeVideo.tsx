/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { IYoutubeVideo } from '../../types/contentfulTypes'
import Container from '../Container'

const getYoutubeRedirectionURl = (id: string): string => `https://www.youtube.com/watch?v=${id}`

const getYoutubeThumbailURL = (id: string): string => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

const YoutubeVideo: React.FC<IYoutubeVideo> = props => {
  const { id, thumbnailWidth, thumbnailHeight } = props
  return (
    <Container margin={{ top: 'medium' }}>
      <a href={getYoutubeRedirectionURl(id)} target="_blank" rel="noreferrer">
        <img src={getYoutubeThumbailURL(id)} height={thumbnailHeight} width={thumbnailWidth} />
      </a>
    </Container>
  )
}

export default YoutubeVideo
