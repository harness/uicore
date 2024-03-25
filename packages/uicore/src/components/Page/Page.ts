/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageHeader } from './PageHeader'
import { PageSubHeader } from './PageSubHeader'
import { PageBody } from './PageBody'
import { NoDataCard } from './NoDataCard'
import { PageSpinner } from './PageSpinner'
import { PageError } from './PageError'

export const Page = {
  Header: PageHeader,
  Body: PageBody,
  NoDataCard,
  Spinner: PageSpinner,
  Error: PageError,
  SubHeader: PageSubHeader
}
