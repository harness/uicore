/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Classes, Intent, PopoverInteractionKind, Position } from '@blueprintjs/core'
import { Icon, IconName } from '@harness/icons'
import { Color } from '@harness/design-system'
import { Popover } from '../Popover/Popover'
import { Container } from '../Container/Container'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import css from './PillToggle.css'

export interface PillToggleOption<T> {
  label: string
  value: T
}

interface BasePillToggleProps<T> {
  selectedView: T
  disableToggle?: boolean
  disableToggleReasonIcon?: IconName
  showDisableToggleReason?: boolean
  disableToggleReasonContent?: React.ReactElement
}

export interface PillBadgeProps<T>
  extends BasePillToggleProps<T>,
    Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onClick'> {
  dataName?: string
  item: PillToggleOption<T>
  children?: React.ReactNode
  onClick: (val: T) => void
}

export interface PillToggleProps<T> extends BasePillToggleProps<T> {
  OptionComponent?: (props: PillBadgeProps<T>) => JSX.Element
  options: [PillToggleOption<T>, PillToggleOption<T>]
  onChange: (val: T) => void
  className?: string
}

const PillBadge = <T,>({
  selectedView,
  item,
  disableToggle = false,
  dataName,
  children,
  showDisableToggleReason = false,
  disableToggleReasonIcon = 'error-outline',
  disableToggleReasonContent,
  onClick,
  ...restProps
}: PillBadgeProps<T>) => {
  const renderInvalidBadge = (pillToggleValue: T) => {
    if (disableToggle && showDisableToggleReason && selectedView !== pillToggleValue) {
      return (
        <Popover interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM} className={Classes.DARK}>
          <Icon
            name={disableToggleReasonIcon}
            size={12}
            className={css.disableToggleReasonIcon}
            data-testid="invalid-icon"
            intent={Intent.DANGER}
          />
          {disableToggleReasonContent ?? (
            <Container padding="medium">
              <Layout.Vertical width={325} padding={{ left: 'small' }}>
                <Text
                  width={284}
                  color={Color.GREY_0}
                  margin={{ bottom: 'small' }}
                  font={{ size: 'normal', weight: 'light' }}>
                  The Visual Editor is disabled because of the errors in the YAML file.
                </Text>
                <Text width={284} color={Color.GREY_0} font={{ size: 'normal', weight: 'light' }}>
                  Fix all the errors indicated in the YAML Editor to enable the Visual mode.
                </Text>
              </Layout.Vertical>
            </Container>
          )}
        </Popover>
      )
    }
    return <></>
  }

  return (
    <div
      data-name={dataName}
      className={cx(css.item, {
        [css.selected]: selectedView === item.value,
        [css.disabledMode]: disableToggle
      })}
      onClick={() => {
        if (selectedView === item.value || disableToggle) {
          return
        }
        onClick(item.value)
      }}
      tabIndex={0}
      role="button"
      {...restProps}>
      {item.label}
      {renderInvalidBadge(item.value)}
    </div>
  )
}

export const PillToggle = <T,>(props: PillToggleProps<T>): React.ReactElement => {
  const { selectedView, onChange, className, options, OptionComponent, ...rest } = props

  const PillBadgeComponent = OptionComponent || PillBadge

  return (
    <div className={cx(css.optionBtns, className, { [css.customBtns]: !!OptionComponent })}>
      <PillBadgeComponent
        dataName="toggle-option-one"
        selectedView={selectedView}
        onClick={onChange}
        tabIndex={0}
        item={options[0]}
        {...rest}
      />

      <PillBadgeComponent
        dataName="toggle-option-two"
        selectedView={selectedView}
        onClick={onChange}
        tabIndex={0}
        item={options[1]}
        {...rest}
      />
    </div>
  )
}
