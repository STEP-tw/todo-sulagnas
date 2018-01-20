let fs=require('fs')
const WebApp = require('./webapp');
const preprocessor=require('./src/lib/preprocessor.js');
const urlHandler=require('./src/lib/urlHandler.js');

const StaticFileHandler=require('./handlers/staticFileHandler.js');
const ListTodosHandler=require('./handlers/listTodosHandler.js');
const GetLoginHandler=require('./handlers/getLoginHandler.js');
const PostLoginHandler=require('./handlers/postLoginHandler.js');
const LogoutHandler=require('./handlers/logoutHandler.js');

const listTodosHandler=new ListTodosHandler('public',fs);
const staticFileHandler=new StaticFileHandler('public',fs);
const getLoginHandler=new GetLoginHandler('public/loginPage.html',fs);
const postLoginHandler=new PostLoginHandler('public/loginPage.html',fs);
const logoutHandler=new LogoutHandler();

let app = WebApp.create();
app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/listTodos.html',listTodosHandler.getRequestHandler());
app.post('/viewTodo.html',urlHandler.handlePostViewTodo);
app.get('/loginPage.html',urlHandler.handleGetLoginPage);
app.get('/logout',urlHandler.handleLogout);
app.post('/loginPage.html',urlHandler.handlePostLoginPage);
app.post('/addTodo.html',urlHandler.handlePostAddTodo);
app.useAsPostProcessor(staticFileHandler.getRequestHandler());

module.exports=app;
