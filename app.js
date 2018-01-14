const WebApp = require('./webapp');
const preprocessor=require('./serverLib/preprocessor.js');
const serveFile=require('./serverLib/staticFileHandler');
const urlHandler=require('./serverLib/urlHandler.js');
const newTodoHandler=require('./serverLib/newTodoHandler.js');

let app = WebApp.create();

app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',urlHandler.handleGetViewTodo);
app.get('/loginPage.html',urlHandler.handleGetLoginPage);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
app.post('/addTodo.html',newTodoHandler.handleNewTodo);

module.exports=app;
