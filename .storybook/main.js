const path = require('path')
const webpackConfig = require('../webpack.config')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials']
  // webpackFinal: config => {
  //   return {
  //     ...config,
  //     module: {
  //       ...config.module,
  //       rules: [
  //         ...webpackConfig.module.rules,
  //         // .map((rule) => {
  //         //   return {
  //         //     ...rule,
  //         //     include: path.resolve(process.cwd(), 'src')
  //         //   }
  //         // }),
  //         ...config.module.rules
  //       ]
  //     },
  //     plugins: [
  //       ...config.plugins,
  //       ...webpackConfig.plugins
  //     ],
  //     stats: 'minimal'
  //   }
  // }
}
