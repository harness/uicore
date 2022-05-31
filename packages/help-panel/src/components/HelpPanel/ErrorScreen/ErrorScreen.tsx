/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import Container from '../../Container'
import error_icon from '../../../icons/error.svg'
import css from './ErrorScreen.module.css'

const errorIcon = {
  background: `transparent url(${error_icon})`
}

const ErrorScreen = () => {
  return (
    <Container
      flex={{ justifyContent: 'center', alignItems: 'center' }}
      padding="huge"
      style={{ flexDirection: 'column', textAlign: 'center' }}>
      <Container style={errorIcon} className={css.errorIcon}></Container>
      <Container>Error loading content. Please check out our documentation for help on Harness.</Container>
      <a href="https://ngdocs.harness.io/" target="_blank" className={css.harnessDocButton}>
        Head to Harness Docs
      </a>
    </Container>
  )
}

export default ErrorScreen
