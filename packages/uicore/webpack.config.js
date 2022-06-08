/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

//
// TODO: Minimizing CSS in release build (`yarn build`)
//

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const packageJSON = require('./package.json')
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const externals = Object.keys(packageJSON.peerDependencies).reduce((p, c) => ({ ...p, [c]: `commonjs ${c}` }), {})

module.exports = {
  mode: isDev ? 'development' : 'production',
  stats: 'errors-only',

  entry: {
    index: './src/index.ts'
  },

  // devtool: isDev ? 'cheap-eval-source-map' : 'source-map',
  // 'cheap-eval-source-map' does not generate good mapping to original
  // TypeScript source at all. Use 'source-map' all the way instead
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: isDev,
          configFile: path.resolve(__dirname, 'tsconfig.json'),
          onlyCompileBundledFiles: true
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              modules: {
                mode: 'local',
                localIdentName: '[name]--[local]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
              postcssOptions: {
                plugins: [require('postcss-import')(), require('postcss-mixins')(), require('postcss-nested')()]
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },

  externals,

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name]-[id].css'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
