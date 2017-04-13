import ip from "ip";
const LISTEN_PORT = 8081;
let localIP = ip.address(),
	localAddress = `http://${localIP}:${LISTEN_PORT}`,
	hmr = `webpack-hot-middleware/client?path=${localAddress}/__webpack_hmr&reload=true`,
    workingDir = process.cwd(); //工作目录：运行npm start 命令所在的目录

export {
	localAddress,
	hmr,
	workingDir,
    LISTEN_PORT
}
