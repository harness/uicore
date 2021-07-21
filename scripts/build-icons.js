const glob = require('glob')
const path = require('path')
const { camelCase } = require('lodash')

const pattern = path.resolve('src/icons/*.svg')
const files = glob.sync(pattern, { nodir: true, realpath: false })
const _imports = ["import { FunctionComponent, ElementType } from 'react'", "import { KVO } from 'core/Types'"]
const _exports = []
let iconNames = 'type HarnessIconName =\n'

files
  .sort()
  .map(file => file.split('/icons/')[1])
  .forEach(fileName => {
    const name = fileName.split('.svg')[0]
    const ComponentName = name[0].toUpperCase() + camelCase(name).slice(1)
    const key = /^[a-z][a-z0-9]+$/i.test(name) ? name : "'" + name + "'"

    iconNames += "  | '" + name + "'\n"

    _imports.push(`import ${ComponentName} from './${fileName}'`)
    _exports.push('  ' + key + ': ' + ComponentName)
  })

const warningLines = [
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
    '\nconst HarnessIcons: KVO<FunctionComponent<ElementType>> = {\n' +
    _exports.join(',\n') +
    '\n}\n\nexport { HarnessIcons, HarnessIconName }'
)
