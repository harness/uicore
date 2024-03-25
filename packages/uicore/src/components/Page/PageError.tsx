/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text, Layout, Button, ButtonVariation, ButtonProps, Container } from '../../'
import { Icon } from '@harnessio/icons'
import { Color } from '@harnessio/design-system'
import React from 'react'
import i18n from './PageError.i18n'
import css from './PageError.css'

export interface PageErrorProps {
  message?: React.ReactNode
  width?: number
  className?: string
  onClick?: ButtonProps['onClick']
  disabled?: boolean
}

const getErrorNode = (message: React.ReactNode): React.ReactNode => {
  if (!message) {
    return (
      <Text font={{ align: 'center' }} color={Color.RED_500}>
        {i18n.generalError}
      </Text>
    )
  }
  if (typeof message === 'string') {
    return (
      <Text font={{ align: 'center' }} color={Color.RED_500}>
        {message}
      </Text>
    )
  }
  return message
}

export const PageError: React.FC<PageErrorProps> = props => {
  return (
    <Container
      width="100%"
      height="100%"
      flex={{ align: 'center-center' }}
      className={css.pageError}
      data-testid="page-error">
      <Layout.Vertical
        spacing="medium"
        width={props?.width || 500}
        style={{ alignItems: 'center' }}
        className={props.className}>
        <Icon name="error" size={32} color={Color.RED_500} />
        {getErrorNode(props.message)}
        {props.onClick && (
          <Button
            variation={ButtonVariation.PRIMARY}
            text={i18n.retry}
            onClick={props.onClick}
            disabled={props.disabled}
          />
        )}
      </Layout.Vertical>
    </Container>
  )
}
