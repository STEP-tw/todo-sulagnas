let StaticFileHandler=require('./staticFileHandler.js');

class viewTodoHandler extends StaticFileHandler {
  constructor(fs,root) {
    super();
    this.staticFileHandler=new StaticFileHandler(fs,root);
  }
  redirectToLoginPage(res) {
    res.redirect('./loginPage.html');
  }
  execute(req,res) {
    if(!req.user){
      this.redirectToLoginPage(res);
      return;
    }
    this.staticFileHandler.execute(req,res);
  }
}
module.exports=viewTodoHandler;
