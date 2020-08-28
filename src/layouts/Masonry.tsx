import { Container } from '../'
import cx from 'classnames'
import MasonryLayout from 'masonry-layout'
import React, { useEffect, useState } from 'react'

const MASONRY_UNIQUE_CLASS_PREFIX = 'uikit-masonry-layout-'

export type MasonryRef = InstanceType<typeof MasonryLayout>

export interface MasonryProps<T = {}> extends React.ComponentProps<typeof Container> {
  items: T[]
  renderItem: (item: T) => React.ReactElement
  keyOf: (item: T) => string | undefined
  gutter?: number
  masonryRef?: (masonry: MasonryRef) => void
  center?: boolean
}

export const Masonry: React.FC<MasonryProps> = ({
  items,
  renderItem,
  keyOf,
  gutter = 20,
  masonryRef,
  width = '100%',
  height = '100%',
  padding = 'xxxlarge',
  className,
  style,
  center,
  ...others
}) => {
  const classUniqueIndex = document.querySelectorAll(`[class*=${MASONRY_UNIQUE_CLASS_PREFIX}-container]`)?.length ?? 0
  const [containerClass] = useState(`${MASONRY_UNIQUE_CLASS_PREFIX}-container${classUniqueIndex}`)
  const [itemClass] = useState(`${MASONRY_UNIQUE_CLASS_PREFIX}-item-${classUniqueIndex}`)
  const [masonry, setMasonry] = useState<MasonryRef>()
  const _style = Object.assign({}, style, center && { margin: '0 auto' })

  useEffect(() => {
    const container = document.querySelector('.' + containerClass)

    if (container) {
      if (masonry) {
        masonry.destroy?.()
      }

      const _masonry = new MasonryLayout(container, {
        itemSelector: '.' + itemClass,
        gutter,
        fitWidth: !!center,
        transitionDuration: 0
      })

      setMasonry(_masonry)
      masonryRef?.(_masonry)
    }
  }, [items])

  return (
    <Container
      width={width}
      height={height}
      padding={padding}
      className={cx(containerClass, className)}
      {...others}
      style={_style}>
      {items?.map(item => (
        <Container className={itemClass} key={keyOf(item)} style={{ marginBottom: gutter }}>
          {renderItem(item)}
        </Container>
      ))}
    </Container>
  )
}
