/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { useCallback, useRef, ReactPortal, createElement } from 'react'
import { createPortal, unmountComponentAtNode } from 'react-dom'
import { ModalType } from './ModalContext'

/**
 * Callback types provided for descriptive type-hints
 */
type ShowModal = () => void
type HideModal = () => void

/**
 * Utility function to generate unique number per component instance
 */
// const generateModalKey = (() => {
//   let count = 0

//   return () => `${++count}`
// })()

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
export const useModalHook = (component: ModalType, inputs: any[] = []): [ShowModal, HideModal] => {
  const BodyComponent = component
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
    )
  }

  // const key = useMemo(generateModalKey, [])
  // const modal = useMemo(() => component, inputs)
  // const context = useContext(ModalContext)
  // const [isShown, setShown] = useState<boolean>(false)
  const portalRef = useRef<ReactPortal | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const showModal = useCallback(() => {
    // console.log('show modal', portalRef, containerRef)
    if (!portalRef.current && !containerRef.current) {
      const elem = document.createElement('div')
      elem.setAttribute('data-modal', 'custom-modal')
      document.body.appendChild(elem)
      containerRef.current = elem
      console.log({ elem })
      setTimeout(() => {
        portalRef.current = createPortal(<BodyComponent />, elem)
        console.log('component', component, portalRef, containerRef)
      }, 0)
    }
    // setShown(true)
  }, [component])

  const hideModal = useCallback(() => {
    console.log('hide modal', portalRef, containerRef)
    if (portalRef.current && containerRef.current) {
      unmountComponentAtNode(containerRef.current)
      document.body.removeChild(containerRef.current)
      portalRef.current = null
      containerRef.current = null
    }
    // setShown(false)
  }, [])

  // useEffect(() => {
  //   if (isShown) {
  //     // context.showModal(key, modal)
  //   } else {
  //     // context.hideModal(key)
  //   }

  //   // Hide modal when parent component unmounts
  //   // return () => context.hideModal(key)
  // }, [modal, isShown])

  return [showModal, hideModal]
}
