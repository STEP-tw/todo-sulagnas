const http = require('http');
const app=require('./app.js');
const SessionManager = require('./src/utils/sessionManager.js');

app.sessionManager = SessionManager.createFrom('./data/userSessions.json');

const PORT = 4000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
