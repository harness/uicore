/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Color, Text, Icon, Layout, Container } from '../../'
import React from 'react'
import cx from 'classnames'

import css from './PageSpinner.css'

export interface PageSpinnerProps {
  message?: string
  width?: number
  className?: string
  fixed?: boolean
}

export const PageSpinner: React.FC<PageSpinnerProps> = props => {
  return (
    <Container className={cx(css.spinner, { [css.fixed]: props.fixed })} flex={{ align: 'center-center' }}>
      <Layout.Vertical
        spacing="medium"
        width={props?.width || 500}
        style={{ alignItems: 'center' }}
        className={cx(props.className, css.content)}>
        <Icon name="steps-spinner" size={32} color={Color.GREY_600} />
        <Text font={{ size: 'medium', align: 'center' }} color={Color.GREY_600}>
          {props.message || 'Loading, please wait...'}
        </Text>
      </Layout.Vertical>
    </Container>
  )
}
