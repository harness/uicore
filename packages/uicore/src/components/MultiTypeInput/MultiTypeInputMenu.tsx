/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Icon } from '@harness/icons'
import { I18nResource } from '@harness/design-system'
import { Menu } from '@blueprintjs/core'

import { MultiTypeInputType, MultiTypeIcon as TypeIcon, MultiTypeIconSize as TypeIconSize } from './MultiTypeInputUtils'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { LearnMorePopover } from './LearnMorePopover'
import css from './MultiTypeInput.css'
import i18nBase from './MultiTypeInput.i18n'

export interface LearnMoreProps {
  type: MultiTypeInputType
}

export const MULTI_TYPE_INPUT_MENU_LEARN_MORE_STORAGE_KEY = 'harness_multitype_input_learn_more_dontshowagain_0'

export interface MultiTypeInputMenuProps {
  allowedTypes: MultiTypeInputType[]
  i18n?: I18nResource
  onTypeSelect(type: MultiTypeInputType): void
}

export function MultiTypeInputMenu(props: MultiTypeInputMenuProps): React.ReactElement {
  const { allowedTypes, i18n = i18nBase, onTypeSelect } = props
  const [currentType, setCurrentType] = React.useState(MultiTypeInputType.FIXED)
  const [dontShowAgain, setDontShowAgain] = useLocalStorage(MULTI_TYPE_INPUT_MENU_LEARN_MORE_STORAGE_KEY, false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = React.useState(!dontShowAgain)

  return (
    <Menu className={css.menu}>
      {allowedTypes.includes(MultiTypeInputType.FIXED) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.FIXED])}
          labelElement={<Icon name={TypeIcon.FIXED} size={TypeIconSize.FIXED} />}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.FIXED}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.FIXED}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.FIXED)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.FIXED)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.RUNTIME) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.RUNTIME])}
          labelElement={<Icon name={TypeIcon.RUNTIME} size={TypeIconSize.RUNTIME} />}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.RUNTIME}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.RUNTIME}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.RUNTIME)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.RUNTIME)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.EXPRESSION) && (
        <Menu.Item
          className={css.menuItem}
          labelClassName={cx(css.menuItemLabel, css[MultiTypeInputType.EXPRESSION])}
          labelElement={<Icon name={TypeIcon.EXPRESSION} size={TypeIconSize.EXPRESSION} />}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.EXPRESSION}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.EXPRESSION}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.EXPRESSION)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.EXPRESSION)}
        />
      )}
      {isLearnMoreOpen ? null : (
        <Menu.Item
          shouldDismissPopover={false}
          tagName="div"
          className={cx(css.menuItem, css.learnMoreItem)}
          onClick={() => setIsLearnMoreOpen(true)}
          text={
            <div className={css.learnMore}>
              <span>{i18n.learnMore}</span>
              <Icon name="more" />
            </div>
          }
        />
      )}
    </Menu>
  )
}
