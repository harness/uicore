import React from 'react'
import cx from 'classnames'
import { Button } from '../Button/Button'
import { Layout } from '../../layouts/Layout'
import css from './GridListToggle.css'

export enum Views {
  LIST = 'LIST',
  GRID = 'GRID'
}

interface GridListToggleInterface {
  initialSelectedView?: Views
  onViewToggle?: (selectedView: Views) => void
}

export default function GridListToggle(props: GridListToggleInterface): JSX.Element {
  const { initialSelectedView, onViewToggle } = props
  const [selectedView, setSelectedView] = React.useState<Views>(initialSelectedView || Views.GRID)

  return (
    <Layout.Horizontal flex>
      <Button
        className={cx({
          [css.gridUnselected]: selectedView === Views.LIST
        })}
        minimal
        icon="grid-view"
        intent={selectedView === Views.GRID ? 'primary' : undefined}
        onClick={() => {
          setSelectedView(Views.GRID)
          onViewToggle?.(Views.GRID)
        }}
        data-testid="grid-view"
        data-tooltip-id="grid-view"
      />
      <Button
        className={cx({
          [css.listUnselected]: selectedView === Views.GRID
        })}
        minimal
        icon="list"
        intent={selectedView === Views.LIST ? 'primary' : undefined}
        onClick={() => {
          setSelectedView(Views.LIST)
          onViewToggle?.(Views.LIST)
        }}
        data-testid="list-view"
        data-tooltip-id="list-view"
      />
    </Layout.Horizontal>
  )
}
