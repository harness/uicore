const glob = require('glob')
const path = require('path')

const pattern = path.resolve('src/icons/*.svg')
const files = glob.sync(pattern, { nodir: true, realpath: false })
const _imports = []
const _exports = []

 function toPascalCase(str) {
  return str.match(/[a-z]+/gi).map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  }).join('')
}

files
  .sort()
  .map(file => file.split('/icons/')[1])
  .forEach(fileName => {
    const ComponentName = toPascalCase(fileName.split('.svg')[0])

    _imports.push(`import ${ComponentName} from './${fileName}'`)
    _exports.push('  ' + ComponentName)
  })

console.log(_imports.join('\n') + '\n\nconst Icons = {\n' + _exports.join(',\n') + '\n}\n\nexport { Icons }')
