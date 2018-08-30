const path = require('path');

module.exports = {
  entry: './demo/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './demo')
  },
  devServer: {
    contentBase: './demo',
    port: 8090,
    inline: true
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
              ["@babel/preset-env", { "modules": false }],
              "@babel/preset-react"
            ]
          },
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};
