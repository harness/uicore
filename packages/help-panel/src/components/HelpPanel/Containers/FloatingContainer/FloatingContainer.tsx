/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { forwardRef } from 'react'
import Container from '../../../Container'
import css from './FloatingContainer.module.css'
import floating_button from '../../../../icons/floating_button.svg'
import { HelpPanelContext } from '../../../../HelpPanelContext'

const FloatingContainer = forwardRef<HTMLButtonElement | null, any>((props, ref) => {
  const { isHelpPanelVisible, setHelpPanelVisibility } = React.useContext(HelpPanelContext)
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
          background: `transparent url(${floating_button})`
        }}
      />
    </Container>
  )
})

export default FloatingContainer
