/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { isEmpty } from 'lodash-es'

const IGNORED_ERRORS = [
  'Failed to fetch: The user aborted a request.',
  'Failed to fetch: Failed to fetch',
  'Failed to fetch: 504 Gateway Timeout',
  "Failed to fetch: Failed to execute 'fetch' on 'Window': The user aborted a request.",
  'Failed to fetch: The operation was aborted.'
]

export function shouldShowError(e: any): boolean {
  const hideMessagesForStatusCodes = [502, 503]
  const message = (e?.message || '').trim()
  if (IGNORED_ERRORS.includes(message) || hideMessagesForStatusCodes.includes(e?.status)) {
    return false
  }
  return true
}

/* TODO Don't see proper types for this new errors format, replace Record<string, any> with more stricter type when available */
export function getErrorInfoFromErrorObject(error: Record<string, any>, errorArrayAsPriority?: boolean): string {
  let errorArrayValStr = ''
  if (!isEmpty(error?.data?.errors) && Array.isArray(error?.data?.errors)) {
    const arrVal = error.data.errors as Array<{ fieldId: string; error: string }>
    errorArrayValStr = arrVal
      .map(err => {
        return `${err.fieldId} ${err.error}`
      })
      .join(', ')
  }
  if (errorArrayAsPriority && errorArrayValStr) {
    return errorArrayValStr
  }
  return error?.data?.message || errorArrayValStr || error?.message || ''
}
