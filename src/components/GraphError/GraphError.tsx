import React from 'react'
import css from './GraphError.css'
import { Icon } from '../../icons/Icon'
import { Container } from '../Container/Container'
import { Link } from '../Link/Link'

interface Props {
  image?: any
  width?: string
  height?: string
  title?: string
  linkText?: string
  link?: string
  onLinkClick?: () => void
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
        <Container className={css.link}>
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
        </Container>
      ) : null}
    </Container>
  )
}

export { GraphError }
