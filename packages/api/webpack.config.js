// webpack.config.js
const path = require( 'path' );
module.exports = {
    context: __dirname,
    entry:{
        'data-structures': './dist/cjs/index.js',
    },
    output: {
        path: path.resolve( __dirname, 'dist', 'browser' ),
        filename: '[name].js',
        library: 'DataStructures',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
};
