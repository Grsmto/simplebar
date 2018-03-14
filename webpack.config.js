const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV == 'production';

const pkg = require('./package.json');

var plugins = [];

var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }
];

if (production) {
  loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }
  ];

  plugins = [
    new UglifyJSPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        screw_ie8: true
      }
    }),
    
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.BannerPlugin({
      banner: `
        ${pkg.title || pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}
        
        Made by ${pkg.author}
        Under ${pkg.license} License
      `
    })
  ];
}

module.exports = {
  devtool: production ? false : 'source-map',

  entry: './src/simplebar',

  devServer: {
    contentBase: './demo'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simplebar.js',
    libraryTarget: 'umd',
    library: 'SimpleBar',
    libraryExport: 'default'
  },

  module: {
    rules: loaders
  },

  plugins

};
