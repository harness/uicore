/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { Entry, Asset } from 'contentful'
import type { Color } from '@harness/design-system'
import type { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface ComponentValue {
  name: string
}

export enum HelpPanelEnvironment {
  master = 'master',
  qa = 'QA'
}

export enum ContentType {
  helpPanel = 'helpPanel',
  article = 'article',
  image = 'image',
  youtubeVideo = 'youtubeVideo',
  referenceIdMap = 'referenceIdMap'
}

export interface IHelpPanel {
  articles: Entry<IArticle>[]
  backgroundColor: Color
  title?: string
}

export interface IArticle extends ComponentValue {
  title: string
  description?: RichTextDocument
  body?: Entry<ComponentValue>[]
}

export interface IImage extends ComponentValue {
  image: Asset
  redirectUrl: string
  width: number
}

export interface IYoutubeVideo extends ComponentValue {
  id: string
  thumbnailHeight: number
  thumbnailWidth: number
}

export interface IVideo extends ComponentValue {
  thumbnailUrl: string
  thumbailHeight: number
  thumbnailWidth: number
}

export interface IReferenceIdMap {
  referenceId: string
  helpPanel: Entry<IHelpPanel>
}
