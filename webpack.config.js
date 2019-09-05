const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

console.log('isDev', isDev)

module.exports = {
  entry: {
    index: './src/index.ts'
  },

  devtool: isDev ? 'cheap-eval-source-map' : 'source-map',

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
                localIdentName: '[name]---[local]--[hash:base64:5]',
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
