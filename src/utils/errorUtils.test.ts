import { getErrorInfoFromErrorObject } from './errorUtils'

describe('Test errorUtils', () => {
  const errData = {
    data: {
      status: 'FAILURE',
      code: 'INVALID_REQUEST',
      message: 'outer message',
      correlationId: 'fdfdsf',
      errors: [
        { fieldId: 'valueType', error: 'may not be null' },
        { error: 'may fdfdfdfdf be null', fieldId: 'valueType' }
      ]
    },
    message: 'Failed to fetch: 400 Bad Request',
    status: 400
  }
  test('should give comma seperated', () => {
    expect(getErrorInfoFromErrorObject(errData, true)).toEqual(
      'valueType may not be null, valueType may fdfdfdfdf be null'
    )
  })
  test('should not give  comma seperated value', () => {
    expect(getErrorInfoFromErrorObject(errData)).toEqual('outer message')
  })

  test('should give 400 Bad Request message', () => {
    const errDatalocal = {
      data: {
        status: 'FAILURE',
        code: 'INVALID_REQUEST',
        message: '',
        correlationId: 'fdfdsf'
      },
      message: 'Failed to fetch: 400 Bad Request',
      status: 400
    }
    errDatalocal.data.message = ''
    expect(getErrorInfoFromErrorObject(errDatalocal)).toEqual('Failed to fetch: 400 Bad Request')
  })
})
