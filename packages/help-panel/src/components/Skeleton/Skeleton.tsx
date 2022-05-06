/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './Skeleton.module.css'

const Skeleton: React.FC = () => {
  const cardStyle = [css.card, css.skeleton].join(' ')
  const lineStyle = [css.line, css.skeleton].join(' ')
  return (
    <div>
      <div className={lineStyle}></div>
      <div className={cardStyle}></div>
      <div className={lineStyle}></div>
      <div className={lineStyle}></div>
      <div className={cardStyle}></div>
    </div>
  )
}

export default Skeleton
