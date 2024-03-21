/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
