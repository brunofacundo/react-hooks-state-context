'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv = {}) => {
    const IS_PRODUCTION = argv.mode === 'production';

    const resolvePath = (...paths) => {
        return path.normalize(path.resolve(...paths));
    };

    return {
        devtool: IS_PRODUCTION ? '' : 'source-map',
        entry: ['@babel/polyfill', resolvePath('src/index.js')],
        output: {
            path: resolvePath('dist'),
            filename: 'index.js'
        },
        resolve: {
            modules: [resolvePath('src'), resolvePath('node_modules')]
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/preset-react'],
                                plugins: [
                                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                                    ['@babel/plugin-proposal-class-properties', { legacy: true }],
                                    ['@babel/plugin-proposal-object-rest-spread', { legacy: true }]
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [],
        stats: {
            warnings: false
        }
    };
};
