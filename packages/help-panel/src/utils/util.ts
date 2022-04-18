/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { EntryCollection } from 'contentful'
import { IContentIdMap } from '../types/contentfulTypes'

export const getRefenceAndContentIdMap = (data: EntryCollection<IContentIdMap>): Record<string, string> => {
  return data.items.reduce((obj, item) => {
    return { ...obj, [item.fields.referenceID]: item.fields.helpPanel.sys.id }
  }, {})
}
