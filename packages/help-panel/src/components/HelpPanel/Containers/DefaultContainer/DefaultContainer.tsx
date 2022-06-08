/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import Container from '../../../Container'
import css from './DefaultContainer.module.css'
import floatingButton from '../../../../icons/floating_button.svg'
import { HelpPanelContext } from '../../../../HelpPanelContext'

const DefaultContainer: React.FC = props => {
  const [isHelpPanelVisible, setHelpPanelVisibility] = useState(!React.useContext(HelpPanelContext).showAgain)

  return (
    <Container className={[css.defaultContainer, isHelpPanelVisible ? css.visibleContainer : ''].join(' ')}>
      {isHelpPanelVisible && props.children}
      <button
        onClick={() => {
          setHelpPanelVisibility(!isHelpPanelVisible)
        }}
        className={css.toggleBtnDefault}
        style={{
          background: `transparent url(${floatingButton})`
        }}
      />
    </Container>
  )
}

export default DefaultContainer
