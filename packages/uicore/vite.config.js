/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

// const path = require('path')
// const _ = require('lodash')
// const packageJSON = require('./package.json')
// const globals = require('../globals.json')
// const dts = require('vite-plugin-dts')

import { defineConfig } from 'vite'
import path from 'path'
import _ from 'lodash'
const packageJSON = require('./package.json')
const globals = require('../globals.json')
import dts from 'vite-plugin-dts'
const external = Object.keys(packageJSON.peerDependencies)

// /**
//  * @type {import('vite').UserConfig}
//  */
// const config = {
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'src'),
//       name: 'HarnessUICore'
//     },
//     rollupOptions: {
//       external,
//       output: {
//         globals: _.pick(globals, external)
//       }
//     }
//   },
//   css: {
//     modules: {
//       scopeBehaviour: 'local',
//       generateScopedName: (name, filename, _css) => {
//         const basename = path.basename(filename).replace(/\.module\.css?.*/, '')
//         console.log(`${basename}--${name}`)
//         return `${basename}--${name}`
//       }
//     }
//   },
//   plugins: [dts()]
// }

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src'),
      name: 'HarnessUICore'
    },
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      external,
      output: {
        globals: _.pick(globals, external)
      }
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: (name, filename, _css) => {
        const basename = path.basename(filename).replace(/\.module\.css?.*/, '')
        return `${basename}--${name}`
      }
    }
  },
  plugins: [dts()]
})
