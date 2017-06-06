const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const path = require("path");
const fs = require("fs");
const cssFilename = 'static/css/[name].[contenthash:8].css';

var commonLoaders = [
    {
        test: /\.js$/,
        loader: "babel-loader",
        include: [paths.appSrc, paths.appServerSrc],
        exclude: /node_modules/,
        query: {
            cacheDirectory: true,
            presets: ["es2015", "react", "stage-0"]
        }
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
    {
        test: /\.png$/,
        loader: "url-loader"
    },
    {
        test: /\.jpg$/,
        loader: "file-loader"
    }];

const config = [
    {
        // The configuration for the client
        name: "browser",
        entry: [
            paths.appIndexJs
        ],
        output: {
            path: paths.appBuild,
            filename: 'static/js/[name].[chunkhash:8].js',
            chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
            publicPath: "/"
        },
        resolve: {
            modules: [
                "node_modules"
            ],
            extensions: ['.js', '.json', '.jsx', '.webpack.js', '.web.js'],
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                'react-native': 'react-native-web'
            }
        },
        module: {
            rules: commonLoaders.concat([
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [require('autoprefixer')({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ]
                                    })]
                                }
                            }
                        ]
                    })
                },
            ]),
            loaders: [
                // ** ADDING/UPDATING LOADERS **
                // The "url" loader handles all assets unless explicitly excluded.
                // The `exclude` list *must* be updated with every change to loader extensions.
                // When adding a new loader, you must add its `test`
                // as a new entry in the `exclude` list in the "url" loader.

                // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
                // Otherwise, it acts like the "file" loader.
                {
                    exclude: [
                        /\.html$/,
                        /\.(js|jsx)$/,
                        /\.css$/,
                        /\.json$/,
                        /\.svg$/
                    ],
                    loader: 'url',
                    query: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        plugins: [

            new webpack.optimize.OccurrenceOrderPlugin(),

            new ExtractTextPlugin({
                filename: cssFilename,
                disable: false,
                allChunks: true
            }),
            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            new ManifestPlugin({
                fileName: 'asset-manifest.json'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true, // React doesn't support IE8
                    warnings: false
                },
                mangle: {
                    screw_ie8: true
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            }),
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // new InterpolateHtmlPlugin(env.raw),
            // Generates an `index.html` file with the <script> injected.
            // new HtmlWebpackPlugin(),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /.css$/g,
                cssProcessor: cssnano,
                cssProcessorOptions: {discardComments: {removeAll: true}},
                canPrint: true
            }),

        ],
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
    },
    {
        // The configuration for the server-side rendering
        name: "server-side rendering",
        entry: [
            paths.appServer,
        ],
        output: {
            path: paths.appBuild,
            filename: "../../server/server.js",
            publicPath: "/",
            libraryTarget: 'umd2'
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
            loaders: commonLoaders
        },
        plugins: [
            new BabiliPlugin({
                    removeDebugger : true,
                }
            ),
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
        ],
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
    }
];

if (process.env.NODE_ENV === 'production') {
    config[0].plugins.push(
        new webpack.NormalModuleReplacementPlugin(
            /^\.\.\/routes\/Routes$/,
            '../routes/RoutesAsync'
        )
    );
}

module.exports = config;
