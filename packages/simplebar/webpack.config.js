const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './demo')
  },
  devServer: {
    static: './demo',
    port: 8090
    // host: "0.0.0.0",
    // allowedHosts: ['.local']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
