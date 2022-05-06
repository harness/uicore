/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface HelpPanelStorageState {
  dontShowAgain: boolean
}

const TOP_LEVEL_KEY = 'helpPanel'
const useHelpPanelStorage = (): [HelpPanelStorageState, Dispatch<SetStateAction<HelpPanelStorageState>>] => {
  return useLocalStorage<HelpPanelStorageState>(TOP_LEVEL_KEY, { dontShowAgain: false })
}

export default useHelpPanelStorage
