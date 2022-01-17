/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Color, Text, Icon, Layout, Button, ButtonVariation, ButtonProps, Container } from '../../'
import React from 'react'
import i18n from './PageError.i18n'

export interface PageErrorProps {
  message?: string
  width?: number
  className?: string
  onClick?: ButtonProps['onClick']
  disabled?: boolean
}

export const PageError: React.FC<PageErrorProps> = props => (
  <Container width="100%" height="100%" flex={{ align: 'center-center' }}>
    <Layout.Vertical
      spacing="medium"
      width={props?.width || 500}
      style={{ alignItems: 'center' }}
      className={props.className}>
      <Icon name="error" size={32} color={Color.RED_500} />
      <Text font={{ align: 'center' }} color={Color.RED_500}>
        {props.message || i18n.generalError}
      </Text>
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
