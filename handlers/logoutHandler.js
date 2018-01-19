let DefaultHandler=require('./defaultHandler.js');

class logoutHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
  }
  execute(req,res) {
    res.setHeader('Set-Cookie',[`Expires=${new Date(1).toUTCString()}`,`sessionid=0, Expires=${new Date(1).toUTCString()}`]);
    delete req.user.sessionid;
    this.redirectToLoginPage(res,'./loginPage.html');
  }
}
module.exports=logoutHandler;
