const path = require('path');

module.exports = {
    mode: 'development',
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
        port: 8081,
    },
};
