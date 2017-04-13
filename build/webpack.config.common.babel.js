import devConfig from './webpack.config.common.dev';
import productConfig from './webpack.config.common.product';
import {argv} from 'yargs';
let commonConfig = argv.dev ? devConfig: productConfig;
export default commonConfig;
