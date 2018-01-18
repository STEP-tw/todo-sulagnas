let registered_users=require('./preprocessor.js').registered_users;
let getContentType=require('./contentType.js');
let fs=require('fs');
let todoHandler=require('./todoHandler.js');

const redirectToViewTodo=function (res) {
  res.redirect('./viewTodo.html')
};

const redirectToLoginPage=function (res) {
  res.redirect('./login');
};

const getUserWithSessionId=function (res,user) {
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
};

const redirectToRequiredPage=function (req,res) {
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    redirectToLoginPage(res);
    return;
  }
  getUserWithSessionId(res,user);
  redirectToViewTodo(res);
};

const handlePostLoginPage=function (req,res) {
  redirectToRequiredPage(req,res);
};

const redirectToIndexPage=function (res) {
  res.redirect('loginPage.html');
};

const handleLogout=function (req,res) {
  res.setHeader('Set-Cookie',[`Expires=${new Date(1).toUTCString()}`,`sessionid=0, Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  redirectToLoginPage(res);
};

const handleGetLoginPage=function (req,res) {
  let path='./public/loginPage.html';
  let content=fs.readFileSync(path);
  res.setHeader('Content-Type',getContentType(path));
  res.write(req.cookies.message||'');
  res.write(content);
};

const handlePostAddTodo=function (req,res) {
  let title=req.body.title;
  let description=req.body.description;
  todoHandler.makeNewTodo(title,description);
  redirectToViewTodo(res);
};

exports.handlePostAddTodo=handlePostAddTodo;
exports.handleGetLoginPage=handleGetLoginPage;
exports.handleLogout=handleLogout;
exports.handlePostLoginPage=handlePostLoginPage;
