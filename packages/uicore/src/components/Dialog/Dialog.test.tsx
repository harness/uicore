/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Dialog } from './Dialog'

describe('<Dialog /> tests', () => {
  test('ignore isCloseButtonShown when title is not set', () => {
    const warnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => undefined)

    render(<Dialog isOpen={true} />)

    expect(warnSpy).not.toBeCalled()

    warnSpy.mockRestore()
  })
})
