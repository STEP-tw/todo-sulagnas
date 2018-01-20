let DefaultHandler=require('./defaultHandler.js');

class postLoginHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
    this.root=root;
    this.fs=fs;
  }
  getPath() {
    return `./${this.root}`;
  }
  getContentType(path) {
    let extension=path.split('.').pop();
    let contentType={
      'html':'text/html'
    };
    if(contentType[extension])
      return contentType[extension];
    return 'text/plain';
  }
  getUserWithSessionId (res,user) {
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
  }
  redirectToRequiredPage (req,res) {
    let user = this.registered_users.find(u=>u.userName==req.body.userName);
    if(!user) {
      res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
      this.redirectTo(res,'./loginPage.html');
      return;
    }
    this.getUserWithSessionId(res,user);
    this.redirectTo(res,'./listTodos.html');
  }
  execute (req,res) {
    this.redirectToRequiredPage(req,res);
  }
}
module.exports=postLoginHandler;
