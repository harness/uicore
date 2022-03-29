/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

/**
 * Callback types provided for descriptive type-hints
 */
type ShowModal = () => void
type HideModal = () => void

/**
 * Utility function to generate unique number per component instance
 */
const generateModalKey = (() => {
  let count = 0

  return () => `${++count}`
})()

/**
 * Check whether the argument is a stateless component.
 *
 * We take advantage of the stateless nature of functional components to be
 * inline the rendering of the modal component as part of another immutable
 * component.
 *
 * This is necessary for allowing the modal to update based on the inputs passed
 * as the second argument to useModal without unmounting the previous version of
 * the modal component.
 */
const isFunctionalComponent = (Component: React.FunctionComponent) => {
  const prototype = Component.prototype

  return !prototype || !prototype.isReactComponent
}

/**
 * React hook for showing modal windows
 */
export const useModalHook = (
  component: React.FunctionComponent<any>,
  deps?: React.DependencyList
): [ShowModal, HideModal] => {
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
    )
  }

  const MemoizedComponent = useMemo(() => component, deps)
  const rootRef = useRef<HTMLDivElement | null>()

  const showModal = useCallback(() => {
    const el = document.createElement('div')
    el.setAttribute('data-id', `harness-modal-root-${generateModalKey()}`)
    document.body.appendChild(el)
    render(<MemoizedComponent />, el)
    rootRef.current = el
  }, [MemoizedComponent])

  const hideModal = useCallback(() => {
    if (rootRef.current) {
      unmountComponentAtNode(rootRef.current)
      document.body.removeChild(rootRef.current)
    }
  }, [])

  useEffect(() => {
    // remove modal when component unmounts
    return () => {
      hideModal()
    }
  }, [])

  return [showModal, hideModal]
}
