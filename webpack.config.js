const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = true;

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'bundle.js',
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080',
        },
        static: {
            directory: path.join(__dirname, "./dist/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets:["@babel/preset-react", "@babel/preset-env"]
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets:["@babel/preset-react", "@babel/preset-env"]
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {loader: 'file-loader'}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    resolve: {
        fallback: {
            path: path.join(__dirname, './node_modules')
        },
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
    ]
};