import Koa from 'koa';
import cors from 'koa-cors';
import webpack from 'webpack';
import path from 'path';
import serveMiddlware from 'koa-static';
import router from 'koa-router';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';
import appConfig from './webpack.config.babel';
import commonConfig from './webpack.config.common.babel';
import {localAddress, LISTEN_PORT} from './js/config';

let app = new Koa(),
	routerMiddleware = router(),
	appCompiler = webpack(appConfig),
	commonCompiler = webpack(commonConfig);

//In order to use HMR for style, css file is not extracted in dev environment.
//And to cotion* mpatible with embeded style, every request for css files need to handled specially to avoid error in console
// routerMiddleware.get("*/bundle.css*", function(next){
//     this.set({
//         "Content-Type": "text/css"
//     });
//     this.body = "";
// })

app.use(routerMiddleware.routes());
app.use(cors({
	credentials: true
}));
// app.use(serveMiddlware(__dirname + "/dist/"));
app.use(devMiddleware(appCompiler, {
    publicPath: "/openplatform/",
	hot: true,
    noInfo: true
}));
app.use(hotMiddleware(appCompiler));
app.use(devMiddleware(commonCompiler, {
    publicPath: "/openplatform/",
	hot: true,
    noInfo: true
}));
app.use(hotMiddleware(commonCompiler));

app.listen(LISTEN_PORT, function(){
	console.log(`listen at port http://localhost:${LISTEN_PORT}`);
});
