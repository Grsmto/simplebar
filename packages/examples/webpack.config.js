const path = require('path');

module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './'),
  },
  devServer: {
    contentBase: './',
    port: 8090,
    inline: true,
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
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
