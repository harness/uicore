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
  newTitle?: string | JSX.Element // insert new section if there's a new title
  hideOnUndefinedValue?: boolean
}

export interface DetailPageCardProps {
  title: string | JSX.Element
  content: Content[]
  classname?: string
}

export const renderItem = ({
  type = ContentType.TEXT,
  label,
  value,
  hideOnUndefinedValue,
  newTitle,
  ...rest
}: Content): JSX.Element | undefined => {
  if (isUndefined(value) && hideOnUndefinedValue) {
    return
  }

  let jsxContent = newTitle ? (
    <Text
      style={{ marginBottom: 'var(--spacing-6)' }}
      className="title"
      color={Color.BLACK}
      font={{ variation: FontVariation.CARD_TITLE }}>
      {newTitle}
    </Text>
  ) : null

  if (type === ContentType.TEXT && typeof value === 'string') {
    jsxContent = (
      <>
        {jsxContent}
        <Layout.Vertical spacing="small" {...rest}>
          <Text font={{ variation: FontVariation.FORM_LABEL }} className="label">
            {label}
          </Text>
          <Text className="value" font={{ variation: FontVariation.FORM_INPUT_TEXT }} width="424px" lineClamp={1}>
            {value}
          </Text>
        </Layout.Vertical>
      </>
    )
  } else if (type === ContentType.CUSTOM) {
    jsxContent = (
      <>
        {jsxContent}
        <Layout.Vertical spacing="small" {...rest}>
          {label ? (
            <Text font={{ variation: FontVariation.FORM_LABEL }} className="label">
              {label}
            </Text>
          ) : null}
          <Text className="value" font={{ variation: FontVariation.FORM_INPUT_TEXT }} width="424px" lineClamp={1}>
            <Container className="customValue">{value}</Container>
          </Text>
        </Layout.Vertical>
      </>
    )
  }
  return <Container className={css.detailsSectionRowWrapper}>{jsxContent}</Container>
}

export const DetailPageCard: React.FC<DetailPageCardProps> = props => {
  const { title, content = [], classname } = props
  return (
    <Card className={cx(css.main, classname)} interactive={false} elevation={0} selected={false}>
      <Text className="title" color={Color.BLACK} font={{ variation: FontVariation.CARD_TITLE }}>
        {title}
      </Text>
      <Layout.Vertical style={{ marginTop: 'var(--spacing-4)' }}>
        {content.map(item => renderItem(item))}
      </Layout.Vertical>
    </Card>
  )
}
