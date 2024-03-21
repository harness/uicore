/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
