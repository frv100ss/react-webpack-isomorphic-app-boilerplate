var path = require("path");
var paths = require("./config/paths");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        js: paths.appIndexJs
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
        loaders: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)(\?.*)?$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
};