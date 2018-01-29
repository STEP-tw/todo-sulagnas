const express = require('express');
const preprocessor=require('./src/lib/preprocessor.js');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const ListTodosHandler=require('./handlers/listTodosHandler.js');

const listTodosHandler=new ListTodosHandler();

let app = express();

const loadUsers = function(){
  try {
    app.todoApp.loadUsers();
  } catch (e) {
    console.log("Unable to load users",e);
  };
}

const loadUser = (req,res,next)=>{
  let sessionid = req.cookies.sessionid;
  let session = app.sessionManager.loadSessionBy(sessionid);
  if(!session){
    next();
    return;
  }
  req.user = app.todoApp.getUser(session.user);
  next();
}

const logoutHandler = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  app.sessionManager.removeSessionBy(sessionid);
  res.setHeader('Set-Cookie',`sessionid=0, Expires=${new Date(1).toUTCString()}`);
  res.redirect('/loginPage.html');
  res.end();
}

app.init = function(){
  loadUsers();
}

app.use(express.static('public'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(preprocessor.logRequest);

app.use(loadUser);

app.use(preprocessor.redirectLoggedOutUserToLogin);


app.get('/listTodos.html',listTodosHandler.getRequestHandler());
app.get('/logout',logoutHandler);
app.get('/loginPage.html',(req,res)=>{
  console.log(`requested for ${req.method} ${req.url}`);
  let message = req.cookies.message || "";
  let html = `<form method="post" id="form">
    userName: <input type="text" name ="userName"><br>
    <input type="submit" value="login"><br>
  </form>`;
  res.set('Content-Type',"text/html");
  html = message + html;
  res.send(html);
})
app.post('/addTodo.html',(req,res)=>{
  let todo = req.body;
  app.todoApp.addTodo(req.user.userName,todo.title,todo.description);
  res.redirect('/listTodos.html');
  res.end()
})

app.get('/viewTodo/:id',(req,res)=>{
  let todo = app.todoApp.todoToHtml(req.user.userName,req.params.id);
  res.write(todo);
  res.end();
})
app.get('/delete/:id',(req,res)=>{
  let todoId = req.params.id;
  let userId=req.user.userName;
  app.todoApp.deleteTodo(userId,todoId);
  res.redirect('/listTodos.html');
  res.end();
})

app.post('/loginPage.html',(req,res)=>{
  let user = app.todoApp.getUser(req.body.userName);
  if(!user){
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=3`);
    res.redirect('/loginPage.html');
    return;
  }
  let session = app.sessionManager.createSessionFor(user.userName);
  res.setHeader('Set-Cookie',`sessionid=${session.Id}`);
  res.redirect('/listTodos.html');
});

app.post('/addItem.html',(req,res)=>{
  let item=req.body.title;
  let todoId = req.body.todoId;
  let userName = req.user.userName;
  app.todoApp.addItem(userName,todoId,item);
  res.redirect(`/viewTodo/${todoId}`);
  res.end();
})

module.exports=app;
