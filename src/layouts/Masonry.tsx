import { Container, Utils } from '../'
import cx from 'classnames'
import MasonryLayout from 'masonry-layout'
import React, { useLayoutEffect, useState } from 'react'

export interface MasonryProps<T = {}> extends React.ComponentProps<typeof Container> {
  items: T[]
  renderItem: (item: T) => React.ReactElement
  keyOf: (item: T) => string | undefined
  gutter?: number
}

export const Masonry: React.FC<MasonryProps> = ({
  items,
  renderItem,
  keyOf,
  gutter = 20,
  width = '100%',
  height = '100%',
  padding = 'xxxlarge',
  className,
  ...others
}) => {
  const [containerClass] = useState(`mansonry-container-${Utils.randomId()}`)
  const [itemClass] = useState(`mansonry-item-${Utils.randomId()}`)
  const [mansonry, setMansonry] = useState<InstanceType<typeof MasonryLayout>>()

  useLayoutEffect(() => {
    const container = document.querySelector('.' + containerClass)

    if (container && !mansonry) {
      setMansonry(
        new MasonryLayout(container, {
          itemSelector: '.' + itemClass,
          gutter,
          transitionDuration: 0
        })
      )
    } else {
      mansonry?.layout?.()
    }
  }, [items])

  return (
    <Container width={width} height={height} padding={padding} className={cx(containerClass, className)} {...others}>
      {items?.map(item => (
        <Container className={itemClass} key={keyOf(item)} style={{ marginBottom: gutter }}>
          {renderItem(item)}
        </Container>
      ))}
    </Container>
  )
}
