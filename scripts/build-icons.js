const glob = require('glob')
const path = require('path')

const pattern = path.resolve('src/icons/*.svg')
const files = glob.sync(pattern, { nodir: true, realpath: false })
const _imports = ["import { FunctionComponent, ElementType } from 'react'", "import { KVO } from 'core/Types'"]
const _exports = []
let iconNames = 'type HarnessIconName =\n'

function toPascalCase(str) {
  return str
    .match(/[a-z]+/gi)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    })
    .join('')
}

files
  .sort()
  .map(file => file.split('/icons/')[1])
  .forEach(fileName => {
    const name = fileName.split('.svg')[0]
    const ComponentName = toPascalCase(name)
    const key = /^[a-z][a-z0-9]+$/i.test(name) ? name : "'" + name + "'"

    iconNames += "  | '" + name + "'\n"

    _imports.push(`import ${ComponentName} from './${fileName}'`)
    _exports.push('  ' + key + ': ' + ComponentName)
  })

const warningLines = [
  '/**',
  '* This file is auto-generated. Please do not modify this file manually.',
  '* Use the command `yarn ui:icons` to regenerate this file.',
  '*/'
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
