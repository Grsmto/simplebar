const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './index.js',
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'dist/bundle.js',
    },
    performance: {
      hints: false,
    },
    devServer: {
      port: 8090,
      hot: isDevelopment && true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  isDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
  };
};
