/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Parse command line arguments
const args = process.argv.slice(2)
const files = args.length > 0 ? args : glob.sync('**/*.svg', { ignore: ['node_modules/**', 'dist/**', 'build/**'] })

let hasErrors = false

files.forEach(file => {
  if (!file.endsWith('.svg')) {
    return
  }

  // Skip if file doesn't exist (e.g., deleted files)
  // This is important for lint-staged which may pass deleted files
  if (!fs.existsSync(file)) {
    return
  }

  try {
    const content = fs.readFileSync(file, 'utf8')

    // Check for <image tags (with various attributes and spacing)
    // Also check for image elements with self-closing tags
    const imageTagRegex = /<image\s+[^>]*\/?>/gi
    const matches = content.match(imageTagRegex)

    if (matches && matches.length > 0) {
      hasErrors = true
      console.error(`❌ Error: ${file}`)
      console.error(`   SVG files should not contain <image> tags. Use pure vector graphics instead.`)

      // Find line number of first match
      const lines = content.split('\n')
      let lineNumber = 0
      let found = false

      for (let i = 0; i < lines.length; i++) {
        if (imageTagRegex.test(lines[i])) {
          lineNumber = i + 1
          found = true
          break
        }
      }

      if (found) {
        console.error(`   Found at line ${lineNumber}`)
      }
      console.error('')
    }
  } catch (error) {
    console.error(`Error reading file ${file}: ${error.message}`)
    hasErrors = true
  }
})

if (hasErrors) {
  const errorCount = files.filter(file => {
    if (!file.endsWith('.svg')) return false
    if (!fs.existsSync(file)) return false
    try {
      const content = fs.readFileSync(file, 'utf8')
      const imageTagRegex = /<image\s+[^>]*\/?>/gi
      return imageTagRegex.test(content)
    } catch {
      return false
    }
  }).length

  console.error(`\n❌ SVG image tag validation failed!`)
  console.error(`   Found ${errorCount} SVG file(s) with <image> tags.`)
  console.error(`   SVG files should contain only pure vector graphics.`)
  process.exit(1)
} else {
  const totalFiles = files.filter(f => f.endsWith('.svg') && fs.existsSync(f)).length
  console.log(`\n✅ All ${totalFiles} SVG files are pure vector graphics (no image tags found)`)
  process.exit(0)
}
