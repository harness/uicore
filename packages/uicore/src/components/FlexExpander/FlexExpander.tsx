/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

export const FlexExpander: React.FC<{ flexGrow?: number }> = ({ flexGrow = 1 }) => <span style={{ flexGrow }} />
