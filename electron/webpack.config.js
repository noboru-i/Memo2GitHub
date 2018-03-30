const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'app', 'renderer.js')
  },
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(react-navigation|react-native-tab-view|react-native-safe-area-view)\/).*/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'react-native': 'react-native-electron'
    },
    extensions: ['.web.js', '.js', '.json']
  },
  output: {
    filename: 'bundle.js'
  },
  target: 'electron-renderer',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true)
    })
  ],
  serve: {
    content: [path.resolve(__dirname, 'app')],
    port: 7000
  }
};
