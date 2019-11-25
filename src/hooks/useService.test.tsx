import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, wait } from '@testing-library/react'
import { useService } from './useService'
import xhr from '@wings-software/xhr-async'

jest.mock('@wings-software/xhr-async')

test('userService must return proper states', async () => {
  const status = 200,
    total = 100,
    limit = 25,
    offset = 30,
    start = 12,
    pageSize = 1000

  const exampleServiceCall = async () => ({
    status,
    total,
    limit,
    offset,
    start,
    pageSize,
    statusText: '',
    request: {}
  })

  const { result, waitForNextUpdate } = renderHook(() => useService(exampleServiceCall))

  await act(async () => {
    // Initially, loading must be true
    // then set to false when the service is settled
    expect(result.current.loading).toEqual(true)
    await waitForNextUpdate()

    const {
      loading,
      status
      // total: _total,
      // limit: _limit,
      // offset: _offset,
      // start: _start,
      // pageSize: _pageSize
    } = result.current

    expect(loading).toEqual(false)
    expect(status).toEqual(200)

    //
    // Currently useService does not keep track of these params (next iteration)
    //
    // expect(_total).toEqual(total)
    // expect(_offset).toEqual(offset)
    // expect(_start).toEqual(start)
    // expect(_pageSize).toEqual(pageSize)
    // expect(_limit).toEqual(limit)
  })
})

test('useService must terminate request when calling service again', async () => {
  const exampleServiceCall = async () => xhr.get('/')
  let isAbortInvoked = false
  ;(xhr.abort as jest.Mock).mockImplementationOnce(() => {
    isAbortInvoked = true
  })
  ;(xhr.get as jest.Mock).mockImplementationOnce(() => ({}))

  const { result, waitForNextUpdate } = renderHook(() => useService(exampleServiceCall))

  await act(async () => {
    const { ref: serviceCall } = result.current

    serviceCall()
    await waitForNextUpdate()
    expect(isAbortInvoked).toEqual(true)
  })
})

test('useService must trigger dependencies', async () => {
  const Url = { ACCOUNT: '/account', ALERT: '/alert', ALERT_TYPE: '/alert' }
  const accountService = async () => xhr.get(Url.ACCOUNT)
  const alertService = async () => xhr.get(Url.ALERT)
  const alertTypeService = async () => xhr.get(Url.ALERT_TYPE)
  const urls: string[] = []
  ;(xhr.get as jest.Mock).mockImplementation(url => {
    urls.push(url)
    return { status: 200, data: { url } }
  })

  const SamplePage = () => {
    const { data: accounts } = useService(accountService)
    const { data: alerts } = useService(alertService, {}, [accounts])
    const { data: alertTypes } = useService(alertTypeService, {}, [alerts])

    return (
      <div id="sample-page">
        {accounts && JSON.stringify(accounts)}
        {alerts && JSON.stringify(alerts)}
        {alertTypes && JSON.stringify(alertTypes)}
      </div>
    )
  }

  render(<SamplePage />)
  await wait(() => {}, { timeout: 500 })

  expect(urls[0]).toEqual(Url.ACCOUNT)
  expect(urls[1]).toEqual(Url.ALERT)
  expect(urls[2]).toEqual(Url.ALERT_TYPE)
  expect(document.getElementById('sample-page')).toMatchSnapshot()
})
