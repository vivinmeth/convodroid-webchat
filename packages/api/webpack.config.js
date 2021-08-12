// webpack.config.js
const path = require( 'path' );
const webpack = require('webpack')
module.exports = {
    context: __dirname,
    entry:{
        'convodroid.bfrwebchat-api': './dist/cjs/index.js',
    },
    output: {
        path: path.resolve( __dirname, 'dist', 'browser' ),
        filename: '[name].js',
        globalObject: 'this',
        library: 'ConvodroidBFRWebChatAPI',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ],

    },
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "process": false
        }

    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
};
