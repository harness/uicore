/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Color, FontVariation } from '@harness/design-system'
import Container from '../Container'

const Footer: React.FC = () => {
  return (
    <Container
      flex={{ alignItems: 'center', justifyContent: 'flex-start' }}
      padding={{ top: 'xlarge', bottom: 'xlarge' }}
      color={Color.BLACK}
      font={{ variation: FontVariation.BODY }}
    >
      <input type="checkbox" name="dontshowagain" id="dontshowagain" />
      <label htmlFor="dontshowagain">&nbsp;&nbsp;Don't show this again</label>
    </Container>
  )
}

export default Footer
