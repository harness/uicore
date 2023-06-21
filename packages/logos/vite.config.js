/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
const path = require('path')
const _ = require('lodash')
const package = require('./package.json')
const globals = require('../globals.json')
const dts = require('vite-plugin-dts')
const reactSvgPlugin = require('vite-plugin-react-svg')

const external = Object.keys(package.peerDependencies)

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
