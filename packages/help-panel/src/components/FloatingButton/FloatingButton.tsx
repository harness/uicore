/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import Container from '../Container'
import floating_button from '../../icons/floating_button.svg'

const style = {
  background: `transparent url(${floating_button})`,
  height: '56px',
  width: '56px',
  cursor: 'pointer',
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  zIndex: 1000
}

const contentContainerStyle = {
  position: 'absolute',
  bottom: '60px',
  right: '52px',
  minHeight: '500px',
  maxHeight: '600px',
  overflow: 'scroll',
  width: '400px',
  boxShadow: '0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)'
}

const FloatingButton: React.FC = ({ children }) => {
  const [showContent, setShowContent] = useState<boolean>(false)

  return (
    <Container onClick={() => setShowContent(!showContent)} style={style}>
      {showContent && <Container style={contentContainerStyle}>{children}</Container>}
    </Container>
  )
}

export default FloatingButton
