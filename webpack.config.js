const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './demo/dist')
  },
  devServer: {
    contentBase: './',
    port: 8090
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
};
