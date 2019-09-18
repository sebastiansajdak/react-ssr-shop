import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';

const common = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    modules: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: "ts-loader",
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'tslint-loader',
                enforce: 'pre'
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
}

const clientConfig = {
    mode: 'production',
    name: 'client',
    target: 'web',
    entry: {
        client: [
            '@babel/polyfill',
            './src/client/client.tsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: common.resolve,
    module: {
        rules: [
            ...common.modules.rules,
            {
                test: /\.(css|scss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 0,
                            sourceMap: false,
                        },
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(woff2?|png|tiff?|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
            }
        },
        ...common.optimization,
    },
    devtool: 'none',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        ...common.plugins,
    ],
}

const serverConfig = {
    mode: 'production',
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        server: [
            '@babel/polyfill',
            path.resolve(__dirname, 'src', 'server/server.tsx'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'server.js'
    },
    resolve: common.resolve,
    module: {
        rules: [
            ...common.modules.rules,
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            onlyLocals: true,
                            localsConvention: 'camelCase',
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                            },
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                    },
                    {
                        loader: require.resolve('sass-loader'),
                    }
                ],
            },
            {
                test: /\.(woff2?|png|tiff?|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ],
    },
    optimization: {
        ...common.optimization,
    },
    plugins: [
        new CopyPlugin([
            { from: 'robots.txt', to: './' },
        ]),
        ...common.plugins,
    ],
    devtool: 'none',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
}

export default [clientConfig, serverConfig];
