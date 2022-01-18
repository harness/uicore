/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const path = require('path')
const globalJestConfig = require('../jest.config')

const finalJestConfig = { ...globalJestConfig }

finalJestConfig.rootDir = path.join(__dirname, '..')
finalJestConfig.testMatch = ['<rootDir>/storyshots-puppeteer/*.runner.ts']

module.exports = finalJestConfig
