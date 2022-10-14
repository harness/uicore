/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import '@testing-library/jest-dom'

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: global.document
  }
})

global.window.scrollTo = jest.fn()

class MockIntersectionObserver {
  constructor() {
    this.root = null
    this.rootMargin = ''
    this.thresholds = []
    this.disconnect = () => null
    this.observe = () => null
    this.takeRecords = () => []
    this.unobserve = () => null
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})
