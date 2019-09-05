const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
const withCSS = require('@zeit/next-css')

module.exports = {
  ...withCSS(withMDX({ pageExtensions: ['js', 'jsx', 'mdx'] }))
}
