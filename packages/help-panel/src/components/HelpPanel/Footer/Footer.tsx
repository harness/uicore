/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color, FontVariation } from '@harness/design-system'
import useHelpPanelStorage from '../../../hooks/useHelpPanelStorage'
import Container from '../../Container'
import { HEADER_FOOTER_HEIGHT } from '../HelpPanelContent/HelpPanelContent'
import css from './Footer.module.css'

const Footer: React.FC = () => {
  const [data, setStorage] = useHelpPanelStorage()

  return (
    <Container
      flex={{ alignItems: 'center', justifyContent: 'flex-start' }}
      color={Color.BLACK}
      className={css.container}
      font={{ variation: FontVariation.BODY }}
      style={{ height: HEADER_FOOTER_HEIGHT }}>
      <input
        type="checkbox"
        name="dontShowAgain"
        id="dontShowAgain"
        checked={data.dontShowAgain}
        onChange={e => {
          setStorage({ ...data, dontShowAgain: e.target.checked })
        }}
      />
      <label htmlFor="dontShowAgain">&nbsp;&nbsp;Don't show this again</label>
    </Container>
  )
}

export default Footer
