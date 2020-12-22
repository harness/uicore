//
// TODO: Minimizing CSS in release build (`yarn build`)
//

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

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
        options: { transpileOnly: isDev }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
                plugins: [
                  require('postcss-import')(),
                  require('postcss-mixins')(),
                  require('postcss-nested')()
              ]
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  output: {
    filename: '[name].js',
    path: isDev ? path.resolve(__dirname, 'docs', 'static') : path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },

  externals: [nodeExternals()],

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name]-[id].css'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
