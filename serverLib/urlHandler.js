let registered_users=require('./preprocessor.js').registered_users;
const redirectToLoginPage=function (res) {
  res.redirect('./loginPage.html');
}

const handleGetYourTodo=function (req,res) {
  if(!req.user){
    redirectToLoginPage(res);
  }
}

const getUserWithSessionId=function (res,user) {
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
};

const redirectToViewTodo=function (res) {
  res.redirect('./viewTodo.html')
}

const redirectToRequiredPage=function (req,res) {
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    redirectToLoginPage(res);
    return;
  }
  getUserWithSessionId(res,user);
  redirectToViewTodo(res);
};

const handlePostLoginPage=function (req,res) {
  redirectToRequiredPage(req,res);
}

exports.handleGetYourTodo=handleGetYourTodo;
exports.handlePostLoginPage=handlePostLoginPage;
