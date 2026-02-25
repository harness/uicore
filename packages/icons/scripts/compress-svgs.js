/*
 * Copyright 2026 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { optimize } = require('svgo')

const srcDir = path.resolve(__dirname, '../src')
const pkgDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(__dirname, '../../..')
const srcRelative = 'packages/icons/src/'
const SKIP_LIST_FILE = '.skip-compress'

/**
 * Returns a Set of absolute paths that should not be compressed
 * (e.g. SVGs that do not render properly when compressed).
 * Entries in .skip-compress are file names only (e.g. xyz.svg), resolved under src/.
 */
function getSkipCompressSet() {
  const set = new Set()
  const skipPath = path.join(pkgDir, SKIP_LIST_FILE)

  if (!fs.existsSync(skipPath)) {
    return set
  }

  const content = fs.readFileSync(skipPath, 'utf8')

  for (const line of content.split('\n')) {
    const trimmed = line.replace(/#.*/, '').trim()

    if (!trimmed) continue

    const fullPath = path.join(srcDir, trimmed)

    set.add(path.normalize(fullPath))
  }

  return set
}

function getNewOrModifiedSvgPaths() {
  let output

  try {
    output = execSync('git status --porcelain', { cwd: repoRoot, encoding: 'utf8' })
  } catch {
    return []
  }

  const files = []

  for (const line of output.trim().split('\n')) {
    if (!line) continue

    const status = line.slice(0, 2)
    if (status.includes('D')) continue // skip deleted (D ,  D, DD)

    let filePath = line.slice(3).trim()

    if (filePath.includes(' -> ')) {
      filePath = filePath.split(' -> ')[1]
    }

    if (filePath.startsWith(srcRelative) && filePath.endsWith('.svg')) {
      const fullPath = path.join(repoRoot, filePath)
      if (fs.existsSync(fullPath)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

function compressFile(filePath) {
  const input = fs.readFileSync(filePath, 'utf8')
  const { data } = optimize(input, { path: filePath })

  fs.writeFileSync(filePath, data, 'utf8')
}

const args = process.argv.slice(2)
const skipSet = getSkipCompressSet()

let files

// Standalone usage: pass SVG path(s), e.g. yarn compress-svg src/icon-name.svg
if (args.length > 0) {
  files = args
    .map(p => path.resolve(process.cwd(), p))
    .filter(p => {
      if (!p.endsWith('.svg')) {
        console.error(`Skipping (not .svg): ${p}`)
        return false
      }

      if (!fs.existsSync(p)) {
        console.error(`Skipping (not found): ${p}`)
        return false
      }

      return true
    })
} else {
  // Build mode: optimize only new/modified SVGs from git
  files = getNewOrModifiedSvgPaths()
}

let compressed = 0
let skipped = 0

for (const filePath of files) {
  const normalized = path.normalize(filePath)

  if (skipSet.has(normalized)) {
    skipped++
    console.log(`Skipped (no-compress list): ${path.relative(pkgDir, filePath)}`)
  } else {
    compressFile(filePath)
    compressed++
  }
}

if (compressed > 0) {
  console.log(`Compressed ${compressed} SVG(s)`)
}

if (skipped > 0) {
  console.log(`Skipped ${skipped} SVG(s) (listed in ${SKIP_LIST_FILE})`)
}
