/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './GraphError.css'
import { Icon } from '@harness/icons'
import { Container } from '../Container/Container'
import { Link } from '../Link/Link'

export interface Props {
  image?: any
  width?: string
  height?: string
  title?: string
  linkText?: string
  link?: string
  onLinkClick?: () => void
  secondLinkText?: string
  secondLink?: string
  onSecondLinkClick?: () => void
}

function GraphError(props: Props) {
  return (
    <Container className={css.main}>
      {props.image ? (
        <Container width={props.width || 320} height={props.height || 180}>
          {props.image ? <img src={props.image} className={css.img} /> : <Icon name={'error'} size={120} />}
        </Container>
      ) : (
        <Container>
          <Icon name={'error'} size={120} />
        </Container>
      )}
      <Container className={css.title}>
        <strong>{props.title ? props.title : 'Error, This Provider is not showing any data '}</strong>
      </Container>
      {props.linkText && (props.onLinkClick || props.link) ? (
        <span className={css.link}>
          {props.onLinkClick ? (
            <a
              onClick={() => {
                props.onLinkClick!()
              }}>
              {props.linkText}
            </a>
          ) : (
            <Link target="_blank" href={props.link}>
              {props.linkText}
            </Link>
          )}
        </span>
      ) : null}

      {props.secondLinkText && (props.onSecondLinkClick || props.secondLink) ? (
        <span className={css.secondLink}>
          {props.onSecondLinkClick ? (
            <a
              onClick={() => {
                props.onSecondLinkClick!()
              }}>
              {props.secondLinkText}
            </a>
          ) : (
            <Link target="_blank" href={props.link}>
              {props.secondLinkText}
            </Link>
          )}
        </span>
      ) : null}
    </Container>
  )
}

export { GraphError }
