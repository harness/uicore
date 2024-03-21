/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text, Layout, Container } from '../../'
import { Icon } from '@harnessio/icons'
import React from 'react'
import cx from 'classnames'
import { Color } from '@harnessio/design-system'

import css from './PageSpinner.css'

export interface PageSpinnerProps {
  message?: string
  width?: number
  className?: string
  fixed?: boolean
}

export const PageSpinner: React.FC<PageSpinnerProps> = props => {
  return (
    <Container
      className={cx(css.spinner, { [css.fixed]: props.fixed })}
      flex={{ align: 'center-center' }}
      data-testid="page-spinner">
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
