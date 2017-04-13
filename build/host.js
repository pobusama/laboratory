import Koa from 'koa';
import cors from 'koa-cors';
import serveMiddlware from 'koa-static';
import path from 'path';

let app = new Koa();
app.use(cors({
	credentials: true
}));

app.use(serveMiddlware(path.join(__dirname, '..', "/dist/")));

app.listen(8080, function(){
	console.log("listen at port http://localhost:8080");
});
