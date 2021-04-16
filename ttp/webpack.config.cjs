const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        callback: './src/callback.js',
        getsub: './src/getsub.js',
    },
    resolve: {
        fallback: {
            stream: false,
        },
        modules: [
            path.resolve(__dirname, '..', 'stubs'),
            'node_modules',
        ],
    },
    devServer: {
        contentBase: 'dist',
        port: 8080,
    },
};
