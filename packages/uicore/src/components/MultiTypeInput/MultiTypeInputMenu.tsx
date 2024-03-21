/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import cx from 'classnames'
import { Icon } from '@harnessio/icons'
import { I18nResource } from '@harnessio/design-system'
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

export type AllowedTypesWithExecutionTime = Exclude<
  MultiTypeInputType,
  MultiTypeInputType.RUNTIME | MultiTypeInputType.RUNTIMEV1
>
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
      {(allowedTypes as AllowedTypesWithRunTime[]).includes(MultiTypeInputType.RUNTIMEV1) && (
        <Menu.Item
          className={css.bp3MenuItem}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.RUNTIMEV1}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.RUNTIMEV1}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.RUNTIMEV1)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.RUNTIMEV1)}
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
      {allowedTypes.includes(MultiTypeInputType.REGEX) && (
        <Menu.Item
          className={css.bp3MenuItem}
          text={
            <LearnMorePopover
              i18n={i18n}
              type={MultiTypeInputType.REGEX}
              isLearnMoreOpen={isLearnMoreOpen && currentType === MultiTypeInputType.REGEX}
              dontShowAgain={dontShowAgain}
              setIsLearnMoreOpen={setIsLearnMoreOpen}
              setDontShowAgain={setDontShowAgain}
            />
          }
          onClick={() => onTypeSelect(MultiTypeInputType.REGEX)}
          onMouseEnter={() => setCurrentType(MultiTypeInputType.REGEX)}
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
