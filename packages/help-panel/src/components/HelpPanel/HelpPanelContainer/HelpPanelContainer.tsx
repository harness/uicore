/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, forwardRef } from 'react'
import useHelpPanelStorage from '../../../hooks/useHelpPanelStorage'
import Container from '../../Container'
import floating_button from '../../../icons/floating_button.svg'
import css from './HelpPanelContainer.module.css'

export enum HelpPanelContainerType {
  FLOATING = 'FLOATING'
}

interface HelpPanelContaierProps {
  type?: HelpPanelContainerType
}

const DEFAULT_WIDTH = '400px'

const buttonStyle = {
  background: `transparent url(${floating_button})`
}

const defaultContainerBtnStyle = {
  background: `transparent url(${floating_button})`
}

// eslint-disable-next-line react/display-name
const HelpPanelContainer: React.FC<HelpPanelContaierProps> = forwardRef<HTMLButtonElement, HelpPanelContaierProps>(
  (props, ref) => {
    const [storageData] = useHelpPanelStorage()
    const [showPanel, setShowPanel] = useState<boolean>(!storageData.dontShowAgain)

    switch (props.type) {
      case HelpPanelContainerType.FLOATING:
        return (
          <Container className={css.floatingContainer}>
            {showPanel && <Container className={css.floatingContent}>{props.children}</Container>}
            <button
              onClick={() => {
                setShowPanel(!showPanel)
              }}
              ref={ref}
              className={css.toggleBtnFloating}
              style={buttonStyle}
            />
          </Container>
        )
      default:
        return (
          <Container className={css.defaultContainer} style={{ width: showPanel ? DEFAULT_WIDTH : 'auto' }}>
            {showPanel && props.children}
            <button
              onClick={() => {
                setShowPanel(!showPanel)
              }}
              className={css.toggleBtnDefault}
              ref={ref}
              style={defaultContainerBtnStyle}
            />
          </Container>
        )
    }
  }
)

export default HelpPanelContainer
