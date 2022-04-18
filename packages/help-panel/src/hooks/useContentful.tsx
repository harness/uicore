/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useEffect, useState } from 'react'
import { createClient } from 'contentful'
import type { ContentType } from '../types/contentfulTypes'

const client = createClient({
  space: 'ghsvvkpjf443',
  accessToken: 'R6XccOT3EI1ylS7epC1vzq6roBnt7yFYLChKuudUp3g'
})

interface useContentfulOptions {
  content_id: string
  content_type: ContentType
}

interface useContentfulState<T> {
  data?: T
  loading: boolean
}

export function useContentful<T>(options: useContentfulOptions): useContentfulState<T> {
  const { content_id, content_type } = options
  const [data, setData] = useState<T | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    client
      .getEntries<T>({
        'sys.id': content_id,
        content_type: content_type,
        include: 10
      })
      .then(response => {
        setLoading(false)
        // add a null check
        setData(response.items[0].fields)
      })
  }, [content_id, content_type])

  return {
    data,
    loading
  }
}

export default useContentful
