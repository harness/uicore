/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color, FontVariation } from '@harness/design-system'
import Container from '../Container'
import cross from '../../icons/cross.svg'

interface HeaderProps {
  title?: string
  onClose?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onClose }) => {
  return (
    <Container
      flex={{ justifyContent: 'space-between', alignItems: 'center' }}
      padding={{ top: 'xlarge', bottom: 'xlarge' }}
      border={{ bottom: true, color: Color.GREY_200 }}
      color={Color.BLACK}
      font={{ variation: FontVariation.UPPERCASED }}
    >
      {title}
      <Container
        onClick={onClose}
        style={{ background: `transparent url(${cross})`, height: '13px', width: '13px', cursor: 'pointer' }}
      ></Container>
    </Container>
  )
}

export default Header
