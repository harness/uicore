import { Container } from '../Container/Container'
import { Card } from '../Card/Card'
import { Text } from '../Text/Text'
import { Layout } from '../../layouts/Layout'
import { Color } from '../../core/Color'
import React from 'react'
import { isUndefined } from 'lodash-es'
import cx from 'classnames'
import css from './DetailPageCard.css'
import { FontVariation } from '../../styled-props/font/FontProps'

export enum ContentType {
  TEXT = 'TEXT', // default
  CUSTOM = 'CUSTOM'
}

export interface Content {
  type?: ContentType
  label: string
  value?: string | JSX.Element
  hideOnUndefinedValue?: boolean
}

export interface DetailPageCardProps {
  title: string
  content: Content[]
  classname?: string
}

export const renderItem = ({
  type = ContentType.TEXT,
  label,
  value,
  hideOnUndefinedValue,
  ...rest
}: Content): JSX.Element | undefined => {
  if (isUndefined(value) && hideOnUndefinedValue) {
    return
  }

  let jsxContent
  if (type === ContentType.TEXT) {
    jsxContent = (
      <Layout.Vertical spacing="small" {...rest}>
        <Text font="small">{label}</Text>
        <Text color={Color.BLACK} width="424px" lineClamp={1}>
          {value}
        </Text>
      </Layout.Vertical>
    )
  } else if (type === ContentType.CUSTOM) {
    jsxContent = (
      <>
        {label ? <Text font="small">{label}</Text> : null}
        {value}
      </>
    )
  }
  return <Container className={css.detailsSectionRowWrapper}>{jsxContent}</Container>
}

export const DetailPageCard: React.FC<DetailPageCardProps> = props => {
  const { title, content = [], classname } = props
  return (
    <Card className={cx(css.main, classname)} interactive={false} elevation={0} selected={false}>
      <Text color={Color.BLACK} font={{ variation: FontVariation.H5 }}>
        {title}
      </Text>
      <Layout.Vertical style={{ marginTop: 'var(--spacing-4)' }}>
        {content.map(item => renderItem(item))}
      </Layout.Vertical>
    </Card>
  )
}
