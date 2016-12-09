var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./app/Entry.js",
    output: {
        path : "dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {
        alias: {
            react: path.resolve(__dirname, './node_modules/react')
        },
        fallback: path.resolve(__dirname, './node_modules')
    },
    resolveLoader: {
        fallback: path.resolve(__dirname, './node_modules')
    }
}