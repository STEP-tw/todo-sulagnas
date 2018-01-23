let fs=require('fs');
const TodoApp=require('./src/models/todoApp.js');
const WebApp = require('./webapp');
const preprocessor=require('./src/lib/preprocessor.js');

const ViewTodoHandler=require('./handlers/viewTodoHandler.js');
const StaticFileHandler=require('./handlers/staticFileHandler.js');
const ListTodosHandler=require('./handlers/listTodosHandler.js');

const todoApp=new TodoApp();
const viewTodoHandler=new ViewTodoHandler();
const listTodosHandler=new ListTodosHandler();
const staticFileHandler=new StaticFileHandler('public',fs);

try {
  todoApp.loadUsers('./data/todo.json');
} catch (e) {
  console.log("Unable to load users");
}


let app = WebApp.create();
app.use(preprocessor.logRequest);
app.use((req,res)=>{
  let sessionid = req.cookies.sessionid;
  let session = app.sessionManager.loadSessionBy(sessionid);
  if(!session){
    return;
  }
  req.user = todoApp.getUser(session.user);
});
app.use(preprocessor.redirectLoggedOutUserToLogin);

app.get('/listTodos.html',listTodosHandler.getRequestHandler());
app.get('/logout',(req,res)=>{
  let sessionid = req.cookies.sessionid;
  app.sessionManager.removeSessionBy(sessionid);
  res.setHeader('Set-Cookie',`sessionid=0, Expires=${new Date(1).toUTCString()}`);
  res.redirect('/loginPage.html');
  res.end();
});
app.get('/viewTodo.html',viewTodoHandler.execute);

app.get('/loginPage.html',(req,res)=>{
  let message = req.cookies.message;
  res.setHeader('Content-Type',"text/html");
  if(message)res.write(message);
  res.write(`<form method="post" id="form">
    userName: <input type="text" name ="userName"><br>
    <input type="submit" value="login"><br>
  </form>`);
  res.end()
})

app.post('/loginPage.html',(req,res)=>{
  let user = todoApp.getUser(req.body.userName);
  if(!user){
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=3`);
    res.redirect('/loginPage.html');
    return;
  }
  let session = app.sessionManager.createSessionFor(user.userName);
  res.setHeader('Set-Cookie',`sessionid=${session.Id}`);
  res.redirect('./listTodos.html');
});

app.useAsPostProcessor(staticFileHandler.getRequestHandler());

module.exports=app;
