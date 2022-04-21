/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, forwardRef } from 'react'
import useHelpPanelStorage from '../../hooks/useHelpPanelStorage'
import Container from '../Container'
import floating_button from '../../icons/floating_button.svg'

export enum HelpPanelContainerType {
  FLOATING = 'FLOATING'
}

interface HelpPanelContaierProps {
  type?: HelpPanelContainerType
}

const floatingContainerStyle = {
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  zIndex: 1000
}

const floatingContentStyle = {
  position: 'absolute',
  bottom: '60px',
  right: '58px',
  minHeight: '500px',
  cursor: 'auto',
  height: '100%',
  overflow: 'scroll',
  width: '400px',
  boxShadow: '0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)'
}

const buttonStyle = {
  cursor: 'pointer',
  height: '56px',
  width: '56px',
  border: 'none',
  background: `transparent url(${floating_button})`
}

const defaultContainerBtnStyle = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  border: 'none',
  height: '56px',
  width: '56px',
  cursor: 'pointer',
  background: `transparent url(${floating_button})`
}

const defaultContainerStyle = {
  position: 'relative',
  height: '100%',
  width: '100%'
}

// eslint-disable-next-line react/display-name
const HelpPanelContainer: React.FC<HelpPanelContaierProps> = forwardRef<HTMLButtonElement, HelpPanelContaierProps>(
  (props, ref) => {
    // take boolean from localstorage
    const [storageData] = useHelpPanelStorage()
    const [showPanel, setShowPanel] = useState<boolean>(!storageData.dontShowAgain)

    const renderButton = style => {
      return (
        <button
          onClick={() => {
            setShowPanel(!showPanel)
          }}
          ref={ref}
          style={style}
        ></button>
      )
    }

    switch (props.type) {
      case HelpPanelContainerType.FLOATING:
        return (
          <Container style={floatingContainerStyle}>
            {showPanel && <Container style={floatingContentStyle}>{props.children}</Container>}
            {renderButton(buttonStyle)}
          </Container>
        )
      default:
        return (
          <Container style={defaultContainerStyle}>
            {showPanel && props.children}
            {renderButton(defaultContainerBtnStyle)}
          </Container>
        )
    }
  }
)

export default HelpPanelContainer
