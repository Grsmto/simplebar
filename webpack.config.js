const path = require('path');

const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV == 'production';

const pkg = require('./package.json');

console.log(`Running ${production ? 'production' : 'dev'} app`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);

var plugins = [];

var loaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
    },
    {
        test: /\.css$/,
        loader: 'style!css!postcss'
    }
];

if (production) {
    loaders = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.css$/,
            loader: ExtractTextWebpackPlugin.extract('style-loader', '!css!postcss')
        }
    ];
  
    plugins = plugins.concat([
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),
    
        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurrenceOrderPlugin(),
    
        new ExtractTextWebpackPlugin('simplebar.css', {
            allChunks: true
        }),
    
        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourceMap: false,
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),

        new webpack.BannerPlugin(`
            ${pkg.title || pkg.name} - v${pkg.version}
            ${pkg.description}
            ${pkg.homepage}
            
            Made by ${pkg.author}
            Under ${pkg.licenses[0].type} License
        `),
  
    ]);

}

module.exports = {
    debug: !production,
    devtool: production ? false : 'source-map',
  
    entry: './src/simplebar',
  
    devServer: {
        contentBase: './demo'
    },
  
    output: {
        path: 'dist',
        filename: 'simplebar.js',
        libraryTarget: 'umd',
        library: 'SimpleBar'
    },
  
    module: {
        loaders
    },
  
    plugins,
  
    postcss() {
        return [autoprefixer];
    }

};
