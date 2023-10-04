/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { IconName } from '@harnessio/icons'
import { Button } from '../Button/Button'
import { Layout } from '../../layouts/Layout'
import css from './GridListToggle.css'

export enum Views {
  LIST = 'LIST',
  GRID = 'GRID',
  SPLIT_VIEW = 'SPLIT_VIEW'
}

export interface GridListToggleProps {
  initialSelectedView?: Views
  onViewToggle?: (selectedView: Views) => void
  icons?: {
    left?: IconName
    right?: IconName
  }
  splitView?: boolean
}

export function GridListToggle(props: GridListToggleProps): JSX.Element {
  const { initialSelectedView, onViewToggle, icons, splitView } = props
  const [selectedView, setSelectedView] = React.useState<Views>(initialSelectedView || Views.GRID)

  React.useEffect(() => {
    setSelectedView(initialSelectedView || Views.GRID)
  }, [initialSelectedView])

  return (
    <Layout.Horizontal flex>
      <Button
        className={cx(
          {
            [css.gridUnselected]: selectedView === Views.LIST
          },
          css.gridButton
        )}
        minimal
        icon={icons?.left ?? 'grid-view'}
        intent={selectedView === Views.GRID ? 'primary' : undefined}
        onClick={() => {
          setSelectedView(Views.GRID)
          onViewToggle?.(Views.GRID)
        }}
        data-testid="grid-view"
        data-tooltip-id="grid-view"
      />
      <Button
        className={cx(
          {
            [css.listUnselected]: selectedView === Views.GRID
          },
          css.listButton,
          css.gridButton
        )}
        minimal
        icon={icons?.right ?? 'list'}
        intent={selectedView === Views.LIST ? 'primary' : undefined}
        onClick={() => {
          setSelectedView(Views.LIST)
          onViewToggle?.(Views.LIST)
        }}
        data-testid="list-view"
        data-tooltip-id="list-view"
      />
      {splitView && (
        <Button
          className={cx(
            {
              [css.listUnselected]: selectedView === Views.SPLIT_VIEW
            },
            css.splitButton
          )}
          minimal
          icon={'SplitView'}
          iconProps={{ size: 20 }}
          intent={selectedView === Views.SPLIT_VIEW ? 'primary' : undefined}
          onClick={() => {
            setSelectedView(Views.SPLIT_VIEW)
            onViewToggle?.(Views.SPLIT_VIEW)
          }}
          data-testid="split-view"
          data-tooltip-id="split-view"
        />
      )}
    </Layout.Horizontal>
  )
}
