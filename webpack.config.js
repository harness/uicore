//
// TODO: Minimizing CSS in release build (`yarn build`)
//

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  stats: 'minimal',

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
            options: { hmr: isDev }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:4]',
                context: path.resolve(__dirname, 'src')
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('postcss-nested')(), require('postcss-import')()]
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
    libraryTarget: 'commonjs'
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
