const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const outputRoot = path.resolve(__dirname, 'dist');

    return {
        mode: 'development',
        entry: {
            app: './index.tsx'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [{ 
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true
                    }
                }, 'css-loader']
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'Todo - DEV'
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: outputRoot
        },
        devServer: {
            contentBase: outputRoot,
            hot: true,
            // https://webpack.js.org/configuration/dev-server/#devserverproxy
            // proxy: {
            //     context: () => true, // proxy all requests
            //     target: 'https://localhost:5001',
            //     secure: false
            // },
        }
    };
};