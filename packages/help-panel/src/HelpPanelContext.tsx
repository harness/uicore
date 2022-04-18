/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useEffect, useState } from 'react'
import { IContentIdMap, ContentType } from './types/contentfulTypes'
import Contentful from './ContentfulApi'

interface HelpPanelContextProps {
  contentIdMap: Record<string, string>
}

export const HelpPanelContext = React.createContext<HelpPanelContextProps>({
  contentIdMap: {}
})

interface HelpPanelContextProviderProps {
  accessToken: string
  space: string
}

export const HelpPanelContextProvider: React.FC<HelpPanelContextProviderProps> = props => {
  const { accessToken, space } = props
  const [contentIdMap, setContentIdMap] = useState<Record<string, string>>({})

  useEffect(() => {
    Contentful.initialise(accessToken, space)
    const client = Contentful.getClient()

    const getContentIdMap = async (): Promise<void> => {
      const response = await client.getEntries<IContentIdMap>({
        content_type: ContentType.contentIdMap
      })

      // move this to a utility
      const idToContentId: Record<string, string> = response.items.reduce((obj, item) => {
        return { ...obj, [item.fields.referenceID]: item.fields.helpPanel.sys.id }
      }, {})

      setContentIdMap(idToContentId)
    }

    getContentIdMap()
  }, [accessToken, space])

  return <HelpPanelContext.Provider value={{ contentIdMap }}>{props.children}</HelpPanelContext.Provider>
}

interface useContentfulOptions {
  referenceId: string
  content_type: ContentType
}

interface useContentfulState<T> {
  data?: T
  loading: boolean
}

export function useContentful<T>(options: useContentfulOptions): useContentfulState<T> {
  const { referenceId, content_type } = options
  const [data, setData] = useState<T | undefined>()
  const [loading, setLoading] = useState(false)
  const { contentIdMap } = React.useContext(HelpPanelContext)

  useEffect(() => {
    const contentId = contentIdMap[referenceId]
    if (contentId) {
      setLoading(true)
      Contentful.getClient()
        .getEntries<T>({
          'sys.id': contentId,
          content_type: content_type,
          include: 10
        })
        .then(response => {
          setLoading(false)
          // add a null check
          setData(response.items[0].fields)
        })
    }
  }, [referenceId, content_type, contentIdMap])

  return {
    data,
    loading
  }
}
