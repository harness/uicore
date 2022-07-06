/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Text, Icon, Layout, Button, ButtonVariation, ButtonProps, Container } from '../../'
import { Color } from '@harness/design-system'
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
    <Container flex={{ align: 'center-center' }} className={css.pageError}>
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
