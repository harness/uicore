/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const glob = require('glob')
const path = require('path')
const { camelCase } = require('lodash')
const ejs = require('ejs')

const pattern = path.resolve('src/*.svg')
const files = glob.sync(pattern, { nodir: true, realpath: false })
const _imports = [
  "import React from 'react'",
  `import { styledClasses, omitStyledProps } from '@harness/design-system'`,
  `import { Classes } from '@blueprintjs/core'`
]
const _components = []
files
  .sort()
  .map(file => file.split('/icons/src/')[1])
  .forEach(fileName => {
    const name = fileName.split('.svg')[0]
    const ComponentName = name[0].toUpperCase() + camelCase(name).slice(1)
    // const key = /^[a-z][a-z0-9]+$/i.test(name) ? name : "'" + name + "'"

    const IconComponent = `Harness_${ComponentName}`

    _imports.push(`import ${IconComponent} from './${fileName}'`)
    const templateString = ejs.renderFile('./scripts/template.ejs', {
      component: {
        name: ComponentName,
        iconName: name,
        iconComponent: IconComponent
      }
    })
    _components.push(templateString)
  })

const warningLines = [
  `/*
  * Copyright 2022 Harness Inc. All rights reserved.
  * Use of this source code is governed by the PolyForm Shield 1.0.0 license
  * that can be found in the licenses directory at the root of this repository, also available at
  * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
  */\n`,
  '/**',
  ' * This file is auto-generated. Please do not modify this file manually.',
  ' * Use the command `yarn ui:icons` to regenerate this file.',
  ' */'
]

async function printAll() {
  const componentStrings = await Promise.all(_components)
  console.log(warningLines.join('\n') + '\n\n\n' + _imports.join('\n') + '\n\n\n' + componentStrings.join('\n'))
}

printAll()
