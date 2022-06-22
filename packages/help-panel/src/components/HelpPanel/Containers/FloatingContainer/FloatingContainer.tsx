/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { forwardRef, useState } from 'react'
import Container from '../../../Container'
import css from './FloatingContainer.module.css'
import floatingButton from '../../../../icons/floating_button.svg'
import { HelpPanelContext } from '../../../../HelpPanelContext'

function FloatingContainer(props: React.PropsWithChildren<unknown>, ref: React.ForwardedRef<HTMLButtonElement | null>) {
  const [isHelpPanelVisible, setHelpPanelVisibility] = useState(!React.useContext(HelpPanelContext).showAgain)

  return (
    <Container className={css.floatingContainer}>
      {isHelpPanelVisible && <Container className={css.floatingContent}>{props.children}</Container>}
      <button
        onClick={() => {
          setHelpPanelVisibility(!isHelpPanelVisible)
        }}
        ref={ref}
        className={css.toggleBtnFloating}
        style={{
          background: `transparent url(${floatingButton})`
        }}
      />
    </Container>
  )
}

const FloatingContainerWithRef = forwardRef<HTMLButtonElement | null, React.PropsWithChildren<unknown>>(
  FloatingContainer
)

export default FloatingContainerWithRef
