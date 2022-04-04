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

const external = Object.keys(package.peerDependencies)

external.forEach(dep => {
  if (!_.has(globals, dep)) {
    console.log(`Entry for "${dep}" not found in globals.json`)
    process.exit(1)
  }
})

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src'),
      name: 'HarnessCore'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: _.pick(globals, external)
      }
    }
  },
  plugins: [dts()]
}

module.exports = config
