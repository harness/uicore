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
