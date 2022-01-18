/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import dynamic from 'next/dynamic'

export const TableExample1 = dynamic(() => import('./TableExample').then(m => m.TableExample), {
  ssr: false
})

export const TableExample2 = dynamic(() => import('./TableExample').then(m => m.TableExample2), {
  ssr: false
})

export default {
  TableExample1,
  TableExample2
}
