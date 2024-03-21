/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path')
const _ = require('lodash')
const packages = require('./package.json')
const globals = require('../globals.json')
const dts = require('vite-plugin-dts')
const reactSvgPlugin = require('vite-plugin-react-svg')

const external = Object.keys(packages.peerDependencies)

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src'),
      name: 'HarnessUseModal'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external,
      // plugins: [svgr()],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: _.pick(globals, external)
      }
      // plugins: [svgr({ icon: true })]
    }
  },
  plugins: [
    dts(),
    reactSvgPlugin({
      defaultExport: 'component',
      svgo: true,
      expandProps: 'end'
    })
  ]
}

module.exports = config
