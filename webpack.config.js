const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV == 'production';

const pkg = require('./package.json');

var plugins = [];

var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
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
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } }, 
          'postcss-loader'
        ]
      })
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

    new ExtractTextPlugin('simplebar.css'),

    new webpack.BannerPlugin({
      banner: `
        ${pkg.title || pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}
        
        Made by ${pkg.author}
        Under ${pkg.license.type} License
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
