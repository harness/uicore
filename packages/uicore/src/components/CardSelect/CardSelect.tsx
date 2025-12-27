/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useRef, useEffect, useCallback } from 'react'
import { Card, CardProps } from '../Card/Card'
import { HTMLDivProps } from '@blueprintjs/core'
import { isEqual } from 'lodash-es'

export enum CardSelectType {
  CardView = 'CardView',
  Any = 'any'
}

export interface CardSelectProps<ObjectType> extends Omit<HTMLDivProps, 'onChange'> {
  selected: ObjectType | ObjectType[] | undefined
  data: ObjectType[]
  multi?: boolean
  type?: CardSelectType
  cardClassName?: string
  renderItem: (item: ObjectType, selected: boolean) => JSX.Element
  onChange: (selected: ObjectType, e: React.MouseEvent<HTMLDivElement>) => void
  cornerSelected?: boolean
}

enum Keys {
  Enter = 'Enter',
  MoveLeft = 'ArrowLeft',
  MoveRight = 'ArrowRight'
}

const ValidKeys: string[] = [Keys.Enter, Keys.MoveLeft, Keys.MoveRight]

export function CardSelect<ObjectType>(props: CardSelectProps<ObjectType>) {
  const {
    className = '',
    cardClassName = '',
    data = [],
    selected,
    renderItem,
    onChange,
    style = {},
    type = CardSelectType.CardView,
    multi = false,
    cornerSelected = false
  } = props
  const rootRef = useRef<HTMLDivElement>(null)

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event
    const target = event.target as HTMLElement
    if (ValidKeys.includes(key)) {
      if (key === Keys.Enter) {
        target.click()
      } else if (key === Keys.MoveLeft) {
        ;(target.previousSibling as HTMLElement)?.click()
        ;(target.previousSibling as HTMLElement)?.focus()
      } else if (key === Keys.MoveRight) {
        ;(target.nextSibling as HTMLElement)?.click()
        ;(target.nextSibling as HTMLElement)?.focus()
      }
    }
  }, [])

  useEffect(() => {
    rootRef.current?.addEventListener('keydown', handleUserKeyPress)
    return () => {
      rootRef.current?.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [])

  if (multi && selected && !Array.isArray(selected)) {
    throw 'For CardSelect with multi as true, then selected prop should be an array'
  }
  return (
    <div className={className} style={style} ref={rootRef}>
      {data.length > 0 &&
        data.map((item, index) => {
          const isSelected =
            multi && Array.isArray(selected)
              ? selected.findIndex(selectedType => isEqual(selectedType, item)) > -1
              : isEqual(item, selected)

          return (
            <React.Fragment key={index}>
              {type === CardSelectType.CardView ? (
                <Card
                  className={cardClassName}
                  interactive={true}
                  data-index={index}
                  selected={isSelected}
                  disabled={(item as CardProps).disabled || false}
                  cornerSelected={cornerSelected}
                  onClick={event => onChange(item, event)}>
                  {renderItem(item, isSelected)}
                </Card>
              ) : (
                <div className={cardClassName} data-index={index} onClick={event => onChange(item, event)}>
                  {renderItem(item, isSelected)}
                </div>
              )}
            </React.Fragment>
          )
        })}
    </div>
  )
}
