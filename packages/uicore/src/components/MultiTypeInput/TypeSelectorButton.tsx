/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useContext } from 'react'
import cx from 'classnames'
import { Icon } from '@harness/icons'
import { I18nResource } from '@harness/design-system'
import { Position, PopoverInteractionKind } from '@blueprintjs/core'
import { Button } from '../Button/Button'
import { MultiTypeIcon, MultiTypeIconSize, MultiTypeInputType } from './MultiTypeInputUtils'
import { AllowedTypes, MultiTypeInputMenu } from './MultiTypeInputMenu'
import css from './MultiTypeInput.css'
import { CustomExpressionInputContext } from '../CustomExpressionInput/CustomExpressionInputContext'

interface RenderButtonTypeProps {
  type: MultiTypeInputType
  btnClassName: string
  i18n: I18nResource
  allowableTypes: AllowedTypes
  disabled?: boolean
  mini?: boolean
  switchType: (newType: MultiTypeInputType) => void
}
const TypeSelectorButton = (props: RenderButtonTypeProps): React.ReactElement | null => {
  const { allowableTypes, mini, type, btnClassName, disabled, i18n, switchType } = props
  if (!allowableTypes.length) return null
  const customExpressionInput = useContext(CustomExpressionInputContext)
  const iconProps =
    type === MultiTypeInputType.CUSTOM_EXPRESSION ? customExpressionInput?.popoverInfo?.iconProps : undefined

  return (
    <Button
      noStyling
      className={cx(mini ? css.miniBtn : css.btn, css[type], btnClassName)}
      tooltip={
        disabled ? undefined : (
          <MultiTypeInputMenu i18n={i18n} onTypeSelect={switchType} allowedTypes={allowableTypes} />
        )
      }
      onClick={ev => {
        // if ((ev.nativeEvent as PointerEvent).pointerType !== 'mouse') {
        //   /*
        //   PIE-1755
        //   https://github.com/palantir/blueprint/issues/3856
        //   Button attached next to an InputGroup triggers the click event when enter key is pressed while typing
        //   So checking the event pointer type, and stopping the propagation if not clicked by the user
        //   */
        //   ev.stopPropagation()
        // }
        ev.preventDefault()
      }}
      disabled={disabled}
      tooltipProps={{
        minimal: true,
        position: Position.BOTTOM_RIGHT,
        interactionKind: PopoverInteractionKind.CLICK,
        popoverClassName: css.popover,
        className: css.wrapper,
        lazy: true
      }}
      data-testid="multi-type-button">
      <Icon name={MultiTypeIcon[type]} size={MultiTypeIconSize[type]} {...iconProps} />
    </Button>
  )
}

export default TypeSelectorButton
