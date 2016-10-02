const path = require('path');

const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV == 'production';

console.log(`Running ${production ? 'production' : 'dev'} app`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
];

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
    
        new ExtractTextWebpackPlugin('app-[hash].css', {
            allChunks: true
        }),
    
        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false,
            sourceMap: false,
            compress: {
                warnings: false,
                screw_ie8: true
            }
        })
  
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
        path: path.resolve(__dirname, 'dist'),
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
