/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const path = require('path')
const globalJestConfig = require('../jest.config')
const _ = require('lodash')

const finalJestConfig = _.cloneDeep(globalJestConfig)

finalJestConfig.rootDir = path.join(__dirname, '..')
finalJestConfig.testMatch = ['<rootDir>/storyshots-puppeteer/*.runner.ts']
finalJestConfig.moduleNameMapper['\\.mdx$'] = '<rootDir>/jest/mdx-mock.js'

module.exports = finalJestConfig
