/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const path = require('path')
const webpackConfig = require('../packages/uicore/webpack.config')

const packagesFolder = path.resolve(__dirname, '../packages')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../packages/*/src/**/*.stories.mdx', '../packages/*/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'))
    fileLoaderRule.exclude = packagesFolder

    const CSSLoader = config.module.rules.find(rule => rule.test.test('.css'))
    CSSLoader.exclude = packagesFolder

    config.module.rules.push({
      test: /\.svg$/,
      include: packagesFolder,
      use: ['@svgr/webpack']
    })

    config.module.rules.push({
      test: /\.css$/,
      include: packagesFolder,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              mode: 'local',
              localIdentName: '[name]--[local]'
            }
          }
        },
        { loader: 'postcss-loader' }
      ]
    })

    config.resolve.alias = {
      ...config.resolve?.alias,
      '@harness/design-system$': path.resolve(packagesFolder, 'design-system/src'),
      '@harness/help-panel$': path.resolve(packagesFolder, 'design-system/src'),
      '@harness/icons$': path.resolve(packagesFolder, 'icons/src'),
      '@harness/use-modal$': path.resolve(packagesFolder, 'useModal/src'),
      '@harness/uicore$': path.resolve(packagesFolder, 'uicore/src')
    }

    return config
  }
}
