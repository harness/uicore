/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Text } from '../../..'
import { StepDetailsInterface } from '../Stepper.types'

export const StepList = [
  {
    id: 'Step1',
    title: 'This is Step 1',
    panel: <Text>Panel Step 1</Text>,
    preview: <Text>Preview Panel Step 1</Text>
  },
  {
    id: 'Step2',
    title: 'This is Step 2',
    panel: <Text>Panel Step 2</Text>,
    preview: <Text>Preview Panel Step 2</Text>
  },
  {
    id: 'Step3',
    title: 'This is Step 3',
    panel: <Text>Panel Step 3</Text>,
    preview: <Text>Preview Panel Step 3</Text>
  }
] as StepDetailsInterface[]
