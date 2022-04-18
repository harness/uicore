/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { IImage } from '../../types/contentfulTypes'

const Image: React.FC<IImage> = props => {
  const { redirectUrl, image, width } = props

  return redirectUrl ? (
    <a href={redirectUrl} target="_blank" rel="noreferrer">
      <img src={`https:${image.fields.file.url}?w=${width}`} />
    </a>
  ) : (
    <img src={`https:${image.fields.file.url}?w=${width}`} />
  )
}

export default Image
