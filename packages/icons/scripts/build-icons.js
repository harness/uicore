/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const glob = require('glob')
const path = require('path')
const { camelCase } = require('lodash')

const pattern = path.resolve('src/*.svg')
const files = glob.sync(pattern, { nodir: true, realpath: false })
const _imports = ["import { ElementType } from 'react'", "import { KVO } from '@harnessio/design-system'"]
const _exports = []
let iconNames = 'type HarnessIconName =\n'

files
  .sort()
  .map(file => file.split('/icons/src/')[1])
  .forEach(fileName => {
    const name = fileName.split('.svg')[0]
    const ComponentName = name[0].toUpperCase() + camelCase(name).slice(1)
    const key = /^[a-z][a-z0-9]+$/i.test(name) ? name : "'" + name + "'"

    iconNames += "  | '" + name + "'\n"

    _imports.push(`import ${ComponentName} from './${fileName}'`)
    _exports.push('  ' + key + ': ' + ComponentName)
  })

const warningLines = [
  `/*
  * Copyright (c) Harness Inc.
  *
  * This source code is licensed under the Apache 2.0 license found in the
  * LICENSE file in the root directory of this source tree.
  */\n`,
  '/**',
  ' * This file is auto-generated. Please do not modify this file manually.',
  ' * Use the command `yarn ui:icons` to regenerate this file.',
  ' */'
]

console.log(
  warningLines.join('\n') +
    '\n' +
    _imports.join('\n') +
    '\n\n' +
    iconNames +
    '\nconst HarnessIcons: KVO<ElementType> = {\n' +
    _exports.join(',\n') +
    '\n}\n\nexport { HarnessIcons, HarnessIconName }'
)
