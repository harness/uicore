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
const fs = require('fs')
const { transformWithEsbuild } = require('vite')

const external = Object.keys(package.peerDependencies)

function reactSvgPlugin() {
  return {
    name: 'react-svg',
    async transform(_code, id) {
      if (id.endsWith('.svg')) {
        const { transform: convert } = await import('@svgr/core')
        const svgoPlugin = await import('@svgr/plugin-svgo')

        const svgCode = await fs.promises.readFile(id, 'utf8')

        const svgoCode = await svgoPlugin.default(svgCode, { svgo: true }, {})

        const componentCode = await convert(
          svgoCode,
          {},
          {
            componentName: 'Component'
          }
        )

        const res = await transformWithEsbuild(componentCode, id, { loader: 'jsx' })

        return {
          code: res.code,
          map: null
        }
      }
    }
  }
}

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
  plugins: [dts(), reactSvgPlugin()]
}

module.exports = config
