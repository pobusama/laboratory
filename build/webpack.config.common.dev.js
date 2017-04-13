import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from "autoprefixer";
import {localAddress, workingDir, LISTEN_PORT} from './js/config';
import {getPages, getEntries} from './js/util';

const OUTPUT_PATH = path.join(workingDir, '/dist/openplatform/');
const BASE_STYLE_PATH = path.join(workingDir, "/src/style");
const NODE_MODULES_PATH = path.join(workingDir, '/node_modules');
const PUBLIC_PATH = `${localAddress}/openplatform/`;

let config = {
    devtool: 'source-map',
    context: workingDir, //为entry设置绝对路径
    entry: getEntries(getPages('common', true), false),
    output: {
        path: OUTPUT_PATH,
        filename: '[name]/bundle.js',
        publicPath: PUBLIC_PATH,
        libraryTarget: 'this',
        pathinfo: true
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint",
            exclude: [/node_modules/]
        }],
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract([
                'css?sourceMap',
                'postcss?sourceMap',
                'sass?sourceMap'
            ])
        }, {
            test: /\.scss\?l$/,
            loader: ExtractTextPlugin.extract([
                // 'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]_[name]__[local]___[hash:base64:5]&sourceMap',
                'postcss?sourceMap',
                'sass?sourceMap'
            ])
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: "url?name=[path][name].[ext]&limit=3072"
        }, {
            test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
            loader: "file?name=[path][name].[ext]"
        }, {
            test: /\.js$/,
            loader: "babel",
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: "html?minimize=false!html-minify" //Minize function of html-loader has bugs, it doesn't work with ko template.
        }]
    },
    sassLoader: {
        includePaths: [BASE_STYLE_PATH]
    },
    'html-minify-loader': {
         comments: true    // KEEP comments
    },
	postcss: function () {
		return [autoprefixer];
	},
    resolve: {
        root: ['src/lib', 'src/components', '.', 'node_modules'],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.scss', 'json']
    },
    resolveLoader: {
        root: NODE_MODULES_PATH
    },
    plugins: [
        new ExtractTextPlugin("[name]/bundle.css"),
        new webpack.optimize.OccurenceOrderPlugin(),//vary the distribution of the ids to get the smallest id length for often used ids with a simple option:
        new webpack.HotModuleReplacementPlugin()
    ]
};

export default config;
