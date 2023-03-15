const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    chunkFilename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.tsx$/,
        loader: 'ts-loader',
      },
      {
        test: /.scss|.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
        default: {
          minSize: 0,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
        }
      ],
    }),
  ],
}
