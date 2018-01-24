const http = require('http');
const app=require('./app.js');
const TodoApp = require('./src/models/todoApp.js');
const SessionManager = require('./src/utils/sessionManager.js');

app.sessionManager = SessionManager.createFrom('./data/userSessions.json');
app.todoApp = new TodoApp('./data/todo.json');

app.init();
const PORT = 4000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
