/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isEmpty } from 'lodash-es'

const IGNORED_ERRORS = [
  'Failed to fetch: The user aborted a request.',
  'Failed to fetch: Failed to fetch',
  'Failed to fetch: 504 Gateway Timeout',
  "Failed to fetch: Failed to execute 'fetch' on 'Window': The user aborted a request.",
  'Failed to fetch: The operation was aborted.',
  'Failed to fetch: Fetch is aborted',
  'Failed to fetch: signal is aborted without reason'
]

export function shouldShowError(e: any): boolean {
  const hideMessagesForStatusCodes = [502, 503]
  const message = (e?.message || '').trim()

  return !IGNORED_ERRORS.includes(message) && !hideMessagesForStatusCodes.includes(e?.status)
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
