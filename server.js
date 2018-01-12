const http = require('http');
const WebApp = require('./webapp');

const serveFile=require('./serverLib/staticFileHandler');
let app = WebApp.create();

app.useAsPostProcessor(serveFile);

const PORT = 4000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
