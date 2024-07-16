/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable camelcase */
/* eslint-disable camelcase */
import { useEffect } from 'react'

type CacheValue<T> = {
  value: T
  timestamp: number
}

type GetCacheType = (key: string) => CacheValue<any> | undefined
type SetCacheType = (key: string, value: any) => void

interface UseCacheReturn {
  getCache: GetCacheType
  setCache: SetCacheType
}

const DEFAULT_CACHE_TIME = 2 * 60 * 1000 // 2 minutes

const CACHE = new Map<string, any>() // Private cache map

export const useCache = <T,>(
  cacheTime = DEFAULT_CACHE_TIME,
  skipCache?: boolean,
  skipCondition?: () => boolean
): UseCacheReturn => {
  useEffect(() => {
    // Cleanup function to remove expired entries on unmount
    return () => {
      for (const key of CACHE.keys()) {
        removeExpiredEntry(key)
      }
    }
  }, [cacheTime])

  const removeExpiredEntry = (key: string) => {
    const cachedItem = CACHE.get(key) as CacheValue<T>
    if (cachedItem && Date.now() > cachedItem.timestamp + cacheTime) {
      CACHE.delete(key)
    }
  }

  const getCache: GetCacheType = key => {
    logCache(key, 'BEFORE GET')
    // Check skip conditions before accessing cache
    if (skipCache || (skipCondition && skipCondition())) {
      return undefined
    }

    removeExpiredEntry(key) // Check and remove expired entry before returning
    return CACHE.get(key)?.value
  }

  const setCache: SetCacheType = (key, value: T) => {
    CACHE.set(key, { value, timestamp: Date.now() })
    logCache(key, 'AFTER SET')
  }

  const logCache = (setKey: string, logString: string) => {
    console.groupCollapsed(`---CACHE ${logString} CACHE for ---` + setKey)
    CACHE.forEach((value, key) => {
      console.log(`${key}: ${value}`)
    })
    console.groupEnd()
  }

  return { getCache, setCache }
}
