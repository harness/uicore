/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useEffect, useState } from 'react'
import { debounce } from 'lodash-es'

const useWindowWidth = (): number => {
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const onResize = debounce(() => setCurrentWidth(window.innerWidth), 100)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return currentWidth
}

export default useWindowWidth
