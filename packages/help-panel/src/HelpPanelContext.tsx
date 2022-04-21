/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useEffect, useState } from 'react'
import { getRefenceAndContentIdMap } from './utils/util'
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
  onError?: (error: unknown) => void
}

export const HelpPanelContextProvider: React.FC<HelpPanelContextProviderProps> = props => {
  const { accessToken, space } = props
  const [contentIdMap, setContentIdMap] = useState<Record<string, string>>({})

  useEffect(() => {
    Contentful.initialise(accessToken, space)
    const client = Contentful.getClient()

    const getContentIdMap = async (): Promise<void> => {
      try {
        const response = await client.getEntries<IContentIdMap>({
          content_type: ContentType.contentIdMap
        })
        setContentIdMap(getRefenceAndContentIdMap(response))
      } catch (e) {
        props.onError?.(e)
        // Error fetching contentID map - add handling in this case
      }
    }

    getContentIdMap()
  }, [accessToken, space])

  return <HelpPanelContext.Provider value={{ contentIdMap }}>{props.children}</HelpPanelContext.Provider>
}

interface useContentfulOptions {
  referenceId: string
  content_type: ContentType
}

export enum Error {
  API_FAILED = 'API_FAILED',
  NOT_FOUND = 'NOT_FOUND',
  NOT_CREATED = 'NOT_CREATED'
}

interface useContentfulState<T> {
  data?: T
  loading: boolean
  error?: Error
}

export function useContentful<T>(options: useContentfulOptions): useContentfulState<T> {
  const { referenceId, content_type } = options
  const [data, setData] = useState<T | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState(false)
  const { contentIdMap } = React.useContext(HelpPanelContext)

  useEffect(() => {
    if (Object.keys(contentIdMap).length > 0) {
      const contentId = contentIdMap[referenceId]
      if (contentId) {
        setLoading(true)
        Contentful.getClient()
          .getEntries<T>({
            'sys.id': contentId,
            content_type: content_type,
            include: 10
          })
          .then(
            response => {
              setLoading(false)
              if (response.items.length > 0) {
                setData(response.items[0].fields)
              } else {
                setError(Error.NOT_CREATED)
              }
            },
            e => {
              setLoading(false)
              setError(Error.API_FAILED)
            }
          )
      } else {
        setError(Error.NOT_FOUND)
      }
    }
  }, [referenceId, content_type, contentIdMap])

  return {
    data,
    loading,
    error
  }
}
