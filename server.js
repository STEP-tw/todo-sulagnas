const http = require('http');
const WebApp = require('./webapp');
const preprocessor=require('./serverLib/preprocessor.js');
const serveFile=require('./serverLib/staticFileHandler');
const urlHandler=require('./serverLib/urlHandler.js');
//const storeTodo=require('./serverLib/storeTodo.js');

let app = WebApp.create();

app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',urlHandler.handleGetYourTodo);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
//app.post('/addTodo.html',storeTodo.handleNewTodo);
app.useAsPostProcessor(serveFile);

const PORT = 4000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
