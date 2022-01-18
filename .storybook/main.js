/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const path = require('path')
const webpackConfig = require('../webpack.config')

const srcFolder = path.resolve(__dirname, '../src')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'))
    fileLoaderRule.exclude = srcFolder

    const CSSLoader = config.module.rules.find(rule => rule.test.test('.css'))
    CSSLoader.exclude = srcFolder

    config.module.rules.push({
      test: /\.svg$/,
      include: srcFolder,
      use: ['@svgr/webpack']
    })

    config.module.rules.push({
      test: /\.css$/,
      include: srcFolder,
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

    return config
  }
}
