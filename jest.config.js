module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['lcov'],
  setupFiles: ['<rootDir>/jest/setup-file.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'ts-jest'
  },
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/jest/svg-mock.js'
  }
}
