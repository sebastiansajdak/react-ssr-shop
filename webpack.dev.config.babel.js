import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
}

const clientConfig = {
    mode: 'development',
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
                            sourceMap: true,
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
        }
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],
}

const serverConfig = {
    mode: 'development',
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
    devtool: 'cheap-module-source-map',
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
