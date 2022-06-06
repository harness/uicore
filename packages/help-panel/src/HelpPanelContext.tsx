/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useEffect, useState } from 'react'
import { getRefrenceIdToHelpPanelMap } from './utils/util'
import { ContentType, HelpPanelEnvironment, IReferenceIdMap } from './types/contentfulTypes'
import Contentful from './ContentfulApi'
import { useLocalStorage } from './hooks/useLocalStorage'

interface HelpPanelContextProps {
  referenceIdMap: Record<string, string>
  isHelpPanelVisible: boolean
  setHelpPanelVisibility: (show: boolean, showAgain?: boolean) => void
  showAgain: boolean
  error: Error | undefined
}

export const HelpPanelContext = React.createContext<HelpPanelContextProps>({
  referenceIdMap: {},
  isHelpPanelVisible: true,
  setHelpPanelVisibility: () => void 0,
  showAgain: false,
  error: undefined
})

interface HelpPanelContextProviderProps {
  accessToken?: string
  space?: string
  environment?: HelpPanelEnvironment
  onError?: (error: unknown) => void
}

interface HelpPanelStorageState {
  dontShowAgain: boolean
}

const TOP_LEVEL_KEY = 'helpPanel'
export const HelpPanelContextProvider: React.FC<HelpPanelContextProviderProps> = props => {
  const { accessToken, space, environment = HelpPanelEnvironment.master } = props
  const [referenceIdMap, setReferenceIdMap] = useState<Record<string, string>>({})
  const [storageData, setStorage] = useLocalStorage<HelpPanelStorageState>(TOP_LEVEL_KEY, { dontShowAgain: false })
  const [showHelpPanel, setShowHelpPanel] = useState<boolean>(!storageData.dontShowAgain)
  const [error, setError] = useState<Error | undefined>()

  const setHelpPanelVisibility = (isHelpPanelVisible: boolean, updateShowAgain?: boolean) => {
    setShowHelpPanel(isHelpPanelVisible)
    if (updateShowAgain) {
      setStorage({
        dontShowAgain: !storageData.dontShowAgain
      })
    }
  }

  useEffect(() => {
    if (accessToken && space) {
      try {
        Contentful.initialise(accessToken, space, environment)
        const client = Contentful.getClient()

        const getContentIdMap = async (): Promise<void> => {
          const response = await client.getEntries<IReferenceIdMap>({
            // eslint-disable-next-line camelcase
            content_type: ContentType.referenceIdMap
          })
          setReferenceIdMap(getRefrenceIdToHelpPanelMap(response))
        }
        getContentIdMap()
      } catch (e) {
        setError(Error.ERROR_INITIALIZING_CONTENTFUL)
        props.onError?.(e)
      }
    } else {
      setError(Error.ERROR_INITIALIZING_CONTENTFUL)
    }
  }, [accessToken, space])

  return (
    <HelpPanelContext.Provider
      value={{
        referenceIdMap,
        isHelpPanelVisible: showHelpPanel,
        setHelpPanelVisibility,
        showAgain: storageData.dontShowAgain,
        error
      }}>
      {props.children}
    </HelpPanelContext.Provider>
  )
}

interface useContentfulOptions {
  referenceId: string
  // eslint-disable-next-line camelcase
  content_type: ContentType
}

export enum Error {
  ERROR_INITIALIZING_CONTENTFUL = 'ERROR_INITIALIZING_CONTENTFUL',
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
  // eslint-disable-next-line camelcase
  const { referenceId, content_type } = options
  const { referenceIdMap, error: contextError } = React.useContext(HelpPanelContext)
  const [data, setData] = useState<T | undefined>()
  const [error, setError] = useState<Error | undefined>(contextError)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (error) {
      return
    }

    if (Object.keys(referenceIdMap).length > 0) {
      const contentId = referenceIdMap[referenceId]
      if (contentId) {
        setLoading(true)
        Contentful.getClient()
          .getEntries<T>({
            'sys.id': contentId,
            // eslint-disable-next-line camelcase
            content_type,
            include: 10 // used for fetching maximum of 10 levels of nesting in response For eg. Help panel -> articles -> image/video
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
            () => {
              setLoading(false)
              setError(Error.API_FAILED)
            }
          )
      } else {
        setLoading(false)
        setError(Error.NOT_FOUND)
      }
    }
    // eslint-disable-next-line camelcase
  }, [referenceId, content_type, referenceIdMap])

  return {
    data,
    loading,
    error
  }
}
