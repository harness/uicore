const path = require('path')
const globalJestConfig = require('../jest.config')

const finalJestConfig = { ...globalJestConfig }

finalJestConfig.rootDir = path.join(__dirname, '..')
finalJestConfig.testMatch = ['<rootDir>/storyshots-puppeteer/*.runner.ts']

module.exports = finalJestConfig
