const WebApp = require('./webapp');
const preprocessor=require('./src/lib/preprocessor.js');
const staticFileHandler=require('./handlers/staticFileHandler.js');
const urlHandler=require('./src/lib/urlHandler.js');
const ViewTodoHandler=require('./handlers/viewTodoHandler.js');
let fs=require('fs')

let app = WebApp.create();
app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',new ViewTodoHandler(fs,'public').getRequestHandler());
app.get('/loginPage.html',urlHandler.handleGetLoginPage);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
app.post('/addTodo.html',urlHandler.handlePostAddTodo);

module.exports=app;
