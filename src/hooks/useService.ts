import { useEffect, useState } from 'react'
import xhr, { XhrResponse } from '@wings-software/xhr-async'

export interface UseServiceInfo<T> {
  status: number
  error?: string
  data?: T
  total?: number
  limit?: string
  offset?: string
  start?: number
  pageSize?: number
  loading?: boolean
  ref: () => void
}

export type ServiceCall<T> = (params: any) => Promise<Omit<UseServiceInfo<T>, 'ref' | 'loading'>>

export type ServiceCallPredicate = () => boolean

const randomId = () =>
  Math.random()
    .toString(36)
    .substring(2)

type DependencyList = ReadonlyArray<object | undefined>

type XhrServiceFunc = (...args: any) => Promise<XhrResponse<unknown>>
type XhrServiceFuncArgs<T extends XhrServiceFunc> = T extends (args: infer P) => Promise<XhrResponse<unknown>>
  ? P
  : never

export function useService<T extends XhrServiceFunc>(
  serviceCall: T,
  args: Omit<XhrServiceFuncArgs<T>, 'xhrGroup'> | undefined = undefined,
  deps: DependencyList = []
): UseServiceInfo<T> {
  const [loading, setLoading] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [status, setStatus] = useState()
  const [shouldInvokeServiceCall, setInvokeServiceCall] = useState(!deps.length) // when there's no predicate, process right away
  const [predicateMap] = useState(new WeakSet())
  let xhrGroup: string
  let unmounted = false

  if (!shouldInvokeServiceCall && deps.length && deps.every(entry => entry && typeof entry === 'object')) {
    let changed = false

    deps.forEach(entry => {
      if (entry && !predicateMap.has(entry)) {
        changed = true
        predicateMap.add(entry)
      }
    })

    if (changed) {
      setInvokeServiceCall(changed)
    }
  }

  useEffect(() => {
    if (shouldInvokeServiceCall) {
      xhrGroup = randomId()
      setLoading(true)

      // Make the service call
      serviceCall({ ...args, xhrGroup }).then(response => {
        const { status, error, data } = (response as unknown) as UseServiceInfo<T>
        // React still has some race condition here and there so we
        // process service call data only when component is still active
        if (!unmounted) {
          setInvokeServiceCall(false)
          setLoading(false)
          setStatus(status)

          switch (status) {
            case 200:
              setData(data)
              break
            case xhr.ABORTED:
              break
            default:
              setError(error)
              break
          }
        }
      })
    }

    return () => {
      unmounted = true
      xhr.abort(xhrGroup)
    }
  }, [shouldInvokeServiceCall]) // whenever shouldInvokeServiceCall is changed, clean up happens, then useEffect starts again

  // TODO: update total, limit, offset, start, pageSize?

  return {
    loading,
    status,
    error,
    data,
    ref: () => {
      xhr.abort(xhrGroup)
      setInvokeServiceCall(true)
    }
  }
}

/*
Note: Why useService does not support Suspense?

Suspense should only be used for loading components dynamically along with React.lazy. It's not suitable to work with custom hooks like useService. Here's why:

1. You have a component named Profile which uses useService, assuming useService supports Suspense.
2. Suspense render fallback for Profile when useService starts loading data (by throwing out a Promise exception).
3. When data comes back, Suspense renders Profile.
4. The problem occurs when Profile gets re-rendered. Because useService triggers loading again, the whole Profile component will be destroyed and replaced by the loading fallback. Then when data comes back, another Profile instance is rendered.

Flows:

- Initial (works perfectly):

  (1) Fetch -> (2) Add <Loading/> -> (3) Data arrives -> (4) Remove <Loading/> + Add <Profile/>.

- Update (flickering):

  (1) <Profile/> is updated -> (2) Fetch -> (3) Remove </Profile/> + Add <Loading/> -> (4) Data arrives -> (5) Remove <Loading/> + Add <Profile/>.

Steps (3) and (5) create flickering and should be avoided.
*/
