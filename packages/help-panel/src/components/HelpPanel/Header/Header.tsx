/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color, FontVariation } from '@harness/design-system'
import Container from '../../Container'
import cross from '../../../icons/cross.svg'
import { HEADER_FOOTER_HEIGHT } from '../HelpPanelContent/HelpPanelContent'
import css from './Header.module.css'

interface HeaderProps {
  title?: string
  onClose?: () => void
}

const closeBtnStyle = {
  background: `transparent url(${cross})`
}

const Header: React.FC<HeaderProps> = ({ title, onClose }) => {
  return (
    <Container
      flex={{ justifyContent: 'space-between', alignItems: 'center' }}
      border={{ bottom: true, color: Color.GREY_200 }}
      color={Color.BLACK}
      font={{ variation: FontVariation.UPPERCASED }}
      style={{ height: HEADER_FOOTER_HEIGHT }}>
      {title}
      {onClose ? <Container onClick={onClose} className={css.closeBtn} style={closeBtnStyle}></Container> : undefined}
    </Container>
  )
}

export default Header
