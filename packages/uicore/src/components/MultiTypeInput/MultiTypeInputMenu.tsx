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

import { MultiTypeInputType } from './MultiTypeInputUtils'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { LearnMorePopover } from './LearnMorePopover'
import css from './MultiTypeInput.css'
import i18nBase from './MultiTypeInput.i18n'

export interface LearnMoreProps {
  type: MultiTypeInputType
}

export const MULTI_TYPE_INPUT_MENU_LEARN_MORE_STORAGE_KEY = 'harness_multitype_input_learn_more_dontshowagain_0'

export type AllowedTypesWithExecutionTime = Exclude<MultiTypeInputType, MultiTypeInputType.RUNTIME>
export type AllowedTypesWithRunTime = Exclude<MultiTypeInputType, MultiTypeInputType.EXECUTION_TIME>
export type AllowedTypes = AllowedTypesWithExecutionTime[] | AllowedTypesWithRunTime[]

export interface MultiTypeInputMenuProps {
  allowedTypes: AllowedTypes
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
          className={css.bp3MenuItem}
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
      {(allowedTypes as AllowedTypesWithRunTime[]).includes(MultiTypeInputType.RUNTIME) && (
        <Menu.Item
          className={css.bp3MenuItem}
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
      {(allowedTypes as AllowedTypesWithExecutionTime[]).includes(MultiTypeInputType.EXECUTION_TIME) && (
        <Menu.Item
          className={css.bp3MenuItem}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.EXECUTION_TIME}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.EXECUTION_TIME}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.EXECUTION_TIME)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.EXECUTION_TIME)}
        />
      )}
      {allowedTypes.includes(MultiTypeInputType.EXPRESSION) && (
        <Menu.Item
          className={css.bp3MenuItem}
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
          className={cx(css.bp3MenuItem, css.learnMoreItem)}
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
