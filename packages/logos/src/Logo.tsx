/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/**
 * This component unifies Harness and Blueprint Icon component so all icons
 * can be referred by name like in Blueprint.
 *
 * TODO: Implement accessible attributes for icons as explained in https://blueprintjs.com/docs/#core/components/icon.
 */
import { Logos, LogoNames } from './Logos'
import React, { ElementType, HTMLAttributes } from 'react'
import { Icon as BIcon, IconName as BIconName, Classes } from '@blueprintjs/core'
import { StyledProps, styledClasses, omitStyledProps } from '@harness/design-system'
import { IconProps } from '@harnessio/icons'

type LogoName = LogoNames | BIconName

interface LogoProps extends Omit<IconProps, 'name'> {
  name: LogoName
  inverse?: boolean
  size?: number
}

function Logo(props: LogoProps): React.ReactElement {
  const name = props.name as string
  const size = props.size || 16
  let Logo: ElementType = Logos[name]

  if (Logo && props.inverse) {
    Logo = Logos[`${name}-inverse`] ? Logos[`${name}-inverse`] : Logo
  }

  if (Logo) {
    return (
      <span {...omitStyledProps(props, 'name', 'size')} data-icon={name} className={styledClasses(props, Classes.ICON)}>
        <Logo width={size} height={size} />
      </span>
    )
  } else {
    return (
      <BIcon
        {...omitStyledProps(props, 'name', 'size')}
        className={styledClasses(props)}
        icon={name as BIconName}
        iconSize={size}
      />
    )
  }
}

export { LogoName, Logos, Logo, LogoProps }
