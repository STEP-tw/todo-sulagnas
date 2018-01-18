let DefaultHandler=require('./defaultHandler.js');

class logoutHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
  }
  redirectToLoginPage(res) {
    res.redirect('./login');
  }
  execute(req,res) {
    res.setHeader('Set-Cookie',[`Expires=${new Date(1).toUTCString()}`,`sessionid=0, Expires=${new Date(1).toUTCString()}`]);
    delete req.user.sessionid;
    this.redirectToLoginPage(res);
  }
}
module.exports=logoutHandler;
