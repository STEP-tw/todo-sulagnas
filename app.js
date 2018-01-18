let fs=require('fs')
const WebApp = require('./webapp');
const preprocessor=require('./src/lib/preprocessor.js');
const urlHandler=require('./src/lib/urlHandler.js');
const StaticFileHandler=require('./handlers/staticFileHandler.js');
const ViewTodoHandler=require('./handlers/viewTodoHandler.js');
const GetLoginHandler=require('./handlers/getLoginHandler.js');
//const PostLoginHandler=require('./handlers/postLoginHandler.js');

const viewTodoHandler=new ViewTodoHandler('public',fs);
const staticFileHandler=new StaticFileHandler('public',fs);
const getLoginHandler=new GetLoginHandler('public/loginPage.html',fs);
//const postLoginHandler=new PostLoginHandler('public/loginPage.html',fs);

let app = WebApp.create();
app.use(preprocessor.logRequest);
app.use(preprocessor.loadUser);

app.get('/viewTodo.html',viewTodoHandler.getRequestHandler());
app.get('/login',getLoginHandler.getRequestHandler());
app.get('/logout',urlHandler.handleLogout);
//app.post('/login',postLoginHandler.getRequestHandler());
app.post('/addTodo.html',urlHandler.handlePostAddTodo);
app.useAsPostProcessor(staticFileHandler.getRequestHandler());

module.exports=app;
