module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    port: 8090,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
