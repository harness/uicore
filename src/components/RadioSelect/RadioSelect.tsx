import React, { useRef, useEffect, useCallback } from 'react'
import { Card } from '../../components/Card/Card'
import { HTMLDivProps } from '@blueprintjs/core'

export interface RadioSelectProps<ObjectType> extends Omit<HTMLDivProps, 'onChange'> {
  selected: ObjectType | undefined
  data: ObjectType[]
  renderItem: (item: ObjectType, selected: boolean) => JSX.Element
  onChange: (selected: ObjectType, e: React.MouseEvent<HTMLDivElement>) => void
}

enum Keys {
  Enter = 13,
  MoveLeft = 37,
  MoveRight = 39
}

const ValidKeys = [Keys.Enter, Keys.MoveLeft, Keys.MoveRight]

export const RadioSelect = <ObjectType extends object>(props: RadioSelectProps<ObjectType>) => {
  const { className, data = [], selected, renderItem, onChange, style = {} } = props
  const rootRef = useRef<HTMLDivElement>(null)

  const handleUserKeyPress = useCallback(event => {
    const { keyCode, target } = event
    if (ValidKeys.indexOf(keyCode) > -1) {
      if (keyCode === Keys.Enter) {
        target.click()
      } else if (keyCode === Keys.MoveLeft) {
        target.previousSibling?.click()
        target.previousSibling?.focus()
      } else if (keyCode === Keys.MoveRight) {
        target.nextSibling?.click()
        target.nextSibling?.focus()
      }
    }
  }, [])

  useEffect(() => {
    rootRef.current?.addEventListener('keydown', handleUserKeyPress)
    return () => {
      rootRef.current?.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [])
  return (
    <div className={className} style={style} ref={rootRef}>
      {data.length > 0 &&
        data.map((item, index) => {
          const isSelected = item === selected
          return (
            <Card
              key={index}
              interactive={true}
              data-index={index}
              selected={isSelected}
              onClick={event => onChange(item, event)}>
              {renderItem(item, isSelected)}
            </Card>
          )
        })}
    </div>
  )
}
