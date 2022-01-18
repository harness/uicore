/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const COMMIT_MSG = process.argv[2]
const COMMIT_REGEX = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .{1,50}/

if (!COMMIT_REGEX.test(COMMIT_MSG)) {
  console.log('Commit messages must be "fix/feat/docs/style/refactor/perf/test/chore: <changes>"')
  process.exit(1)
}
