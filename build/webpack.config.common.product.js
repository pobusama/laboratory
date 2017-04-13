import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from "autoprefixer";
import {argv} from 'yargs';
import {localAddress, workingDir, LISTEN_PORT} from './js/config';
import {getPages, getEntries} from './js/util.js';
import {fileMappingPlugin} from './plugin/fileMappingAppendPlugin';

const SRC_PATH = path.join(workingDir, '/src');
const PUBLIC_PATH = `/openplatform/`;
const OUTPUT_PATH = path.join(workingDir, '/dist/openplatform/');
const BASE_STYLE_PATH = path.join(workingDir, "/src/style");
const NODE_MODULES_PATH = path.join(workingDir, '/node_modules');

let hashStr = argv.nohash ? '' : '-[hash:5]';
let conhashStr = argv.nohash ? '' : '-[contenthash:5]';
let config = {
    context: workingDir,
    entry: getEntries(getPages('common', true)),
    output: {
        publicPath: PUBLIC_PATH,
        path: OUTPUT_PATH,
        filename: `[name]/bundle${hashStr}.js`,
        libraryTarget: 'this'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                [
                    "css",
                    "postcss",
                    "sass"
                ]
            )
        }, {
            test: /\.scss\?l$/,
            loader: ExtractTextPlugin.extract(
                [
                    "css?modules&importLoaders=1&localIdentName=[hash:base64:8]",
                    "postcss",
                    "sass"
                ]
            )
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: "url?name=[path][name]" + hashStr + ".[ext]&limit=3072"
        }, {
            test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
            loader: "file?name=[path][name]" + hashStr + ".[ext]"
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
         comments: true,     // KEEP comments
    },
    postcss: function () {
        return [autoprefixer];
    },
    resolve: {
        root: ['src/lib', 'src/components', '.', 'node_modules'],
        modulesDirectories: ["node_modules"],
        extensions: ['', '.js', '.scss', 'json']
    },
    resolveLoader: {
        root: NODE_MODULES_PATH
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("[name]/bundle" + conhashStr + ".css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        fileMappingPlugin,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};

export default config;
