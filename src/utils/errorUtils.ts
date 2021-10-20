import { isEmpty } from 'lodash-es'

export function shouldShowError(e: any): boolean {
  const hideMessagesForStatusCodes = [502, 503]
  if (
    e?.message === 'Failed to fetch: The user aborted a request.' ||
    e?.message === 'Failed to fetch: Failed to fetch' ||
    e?.message === 'Failed to fetch: 504 Gateway Timeout' ||
    e?.message === "Failed to fetch: Failed to execute 'fetch' on 'Window': The user aborted a request." ||
    hideMessagesForStatusCodes.includes(e?.status)
  ) {
    return false
  }
  return true
}

/* TODO Don't see proper types for this new errors format, replace Record<string, any> with more stricter type when available */
export function getErrorInfoFromErrorObject(error: Record<string, any>): string {
  /* TODO @vardan extend this to N errors instead of first error */
  if (error?.data?.message) {
    return error.data.message
  } else if (!isEmpty(error?.data?.errors)) {
    return `${error?.data.errors[0]?.fieldId} ${error?.data.errors[0]?.error}`
  }
  return error?.message || ''
}
