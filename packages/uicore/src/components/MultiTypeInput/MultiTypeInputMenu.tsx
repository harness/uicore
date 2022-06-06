/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'

import { Menu, Popover } from '@blueprintjs/core'
import { MultiTypeInputType, MultiTypeIcon as TypeIcon, MultiTypeIconSize as TypeIconSize } from './MultiTypeInputUtils'
import { Icon } from '@harness/icons'
import { I18nResource } from '@harness/design-system'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Button, ButtonVariation } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'

import css from './MultiTypeInput.css'
import i18nBase from './MultiTypeInput.i18n'

export interface LearnMoreProps {
  type: MultiTypeInputType
}

const helperText: Record<MultiTypeInputType, React.ReactNode> = {
  [MultiTypeInputType.EXPRESSION]: (
    <React.Fragment>
      <b>Expressions</b> allow you to use Harness input, output, and execution variables in a setting.
    </React.Fragment>
  ),
  [MultiTypeInputType.FIXED]: (
    <React.Fragment>
      <b>Fixed Values</b> are simply values that you enter manually when you configure a setting and do not change at
      runtime.
    </React.Fragment>
  ),
  [MultiTypeInputType.RUNTIME]: (
    <React.Fragment>
      <b>Runtime Inputs</b> are placeholders for values that will be provided when you start a Pipeline execution.
    </React.Fragment>
  )
}

export function LearnMore(props: LearnMoreProps): React.ReactElement {
  const { type } = props
  const [dontShowAgain, setDontShowAgain] = useLocalStorage('harness_multitype_input_learn_more_dontshowagain_0', false)
  const [isOpen, setIsOpen] = React.useState(!dontShowAgain)

  function headerClick(): void {
    // only open if closed else do nothing
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  function handleChange(): void {
    setDontShowAgain(status => !status)
  }

  const popoverContent = (
    <div className={css.learnMore} onClick={e => e.stopPropagation()}>
      <div className={css.header} onClick={headerClick}>
        <span>Learn more</span>
        <Button icon="cross" onClick={() => setIsOpen(false)} variation={ButtonVariation.ICON} />
      </div>
      <div className={css.body}>
        <div className={css.content}>
          <Icon name={TypeIcon[type]} data-type={type} size={TypeIconSize[type] * 1.8} />
          <span>{helperText[type]}</span>
        </div>
        <Checkbox checked={dontShowAgain} onChange={handleChange} label="Don't show again" />
      </div>
    </div>
  )

  return (
    <div className={css.learnMore} onClick={e => e.stopPropagation()}>
      <div className={css.header} onClick={headerClick}>
        <span>Learn more</span>
        <Icon name="more" />
        <Popover
          isOpen={isOpen}
          target={<div className={css.learnMoreEmpty} />}
          content={popoverContent}
          minimal
          position="bottom-right"
          popoverClassName={css.learnMorePopover}
          className={css.learnMoreWrapper}
          modifiers={{ offset: { offset: '0px 0px' }, arrow: { enabled: false } }}
        />
      </div>
    </div>
  )
}

export interface MultiTypeInputMenuProps {
  allowedTypes: MultiTypeInputType[]
  i18n?: I18nResource
  onTypeSelect(type: MultiTypeInputType): void
}

export function MultiTypeInputMenu(props: MultiTypeInputMenuProps): React.ReactElement {
  const { allowedTypes, i18n = i18nBase, onTypeSelect } = props
  const [currentType, setCurrentType] = React.useState(MultiTypeInputType.FIXED)

  return (
    <Menu className={css.menu}>
      {allowedTypes.includes(MultiTypeInputType.FIXED) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.FIXED])}
          labelElement={<Icon name={TypeIcon.FIXED} size={TypeIconSize.FIXED} />}
          text={i18n.fixedValue}
          onClick={() => onTypeSelect(MultiTypeInputType.FIXED)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.FIXED)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.RUNTIME) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.RUNTIME])}
          labelElement={<Icon name={TypeIcon.RUNTIME} size={TypeIconSize.RUNTIME} />}
          text={i18n.runtimeInput}
          onClick={() => onTypeSelect(MultiTypeInputType.RUNTIME)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.RUNTIME)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.EXPRESSION) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.EXPRESSION])}
          labelElement={<Icon name={TypeIcon.EXPRESSION} size={TypeIconSize.EXPRESSION} />}
          text={i18n.expression}
          onClick={() => onTypeSelect(MultiTypeInputType.EXPRESSION)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.EXPRESSION)}
        />
      )}
      <Menu.Item
        shouldDismissPopover={false}
        tagName="div"
        className={cx(css.menuItem, css.learnMoreItem)}
        text={<LearnMore type={currentType} />}
      />
    </Menu>
  )
}
