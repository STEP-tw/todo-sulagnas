const WebApp = require('./webapp');
const preprocessor=require('./src/lib/preprocessor.js');
const serveFile=require('./src/lib/staticFileHandler');
const urlHandler=require('./src/lib/urlHandler.js');

let app = WebApp.create();
app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',urlHandler.handleGetViewTodo);
app.get('/loginPage.html',urlHandler.handleGetLoginPage);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
app.post('/addTodo.html',urlHandler.handlePostAddTodo);

module.exports=app;
