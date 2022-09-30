/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color, FontVariation } from '@harness/design-system'
import Container from '../../Container'
import { HEADER_FOOTER_HEIGHT } from '../HelpPanelContent/HelpPanelContent'
import css from './Footer.module.css'
import { HelpPanelContext } from '../../../HelpPanelContext'

const Footer: React.FC = () => {
  const { showAgain, toggleShowAgain } = React.useContext(HelpPanelContext)

  return (
    <Container className={css.container}>
      <Container
        color={Color.BLACK}
        flex={{ alignItems: 'center', justifyContent: 'flex-start' }}
        font={{ variation: FontVariation.BODY }}
        border={{ top: true, color: Color.GREY_200 }}
        style={{ height: HEADER_FOOTER_HEIGHT, flex: 1 }}>
        <input
          type="checkbox"
          name="dontShowAgain"
          id="dontShowAgain"
          checked={showAgain}
          onChange={() => {
            toggleShowAgain()
          }}
        />
        <label htmlFor="dontShowAgain">&nbsp;&nbsp;Don&apos;t show this again</label>
      </Container>
    </Container>
  )
}

export default Footer
