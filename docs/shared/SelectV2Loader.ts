/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import dynamic from 'next/dynamic'

const SimpleSelect = dynamic(() => import('./SelectV2').then(m => m.SimpleSelect), {
  ssr: false
})

const AsyncSelect = dynamic(() => import('./SelectV2').then(m => m.AsyncSelect), {
  ssr: false
})

export default {
  SimpleSelect,
  AsyncSelect
}