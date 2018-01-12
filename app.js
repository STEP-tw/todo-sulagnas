const WebApp = require('./webapp');
const preprocessor=require('./serverLib/preprocessor.js');
const serveFile=require('./serverLib/staticFileHandler');
const urlHandler=require('./serverLib/urlHandler.js');


let app = WebApp.create();

app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',urlHandler.handleGetYourTodo);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
app.post('/addTodo.html',urlHandler.handleNewTodo);
app.useAsPostProcessor(serveFile);

module.exports=app;
