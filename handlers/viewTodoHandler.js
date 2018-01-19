let DefaultHandler=require('./defaultHandler.js');

class viewTodoHandler extends DefaultHandler{
  constructor(root,fs) {
    super();
    this.fs=fs;
    this.root=root;
  }
  getPath(url) {
    return `./${this.root}${url}`;
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
  writeContentOfFile(res,url) {
    let path=this.getPath(url);
    let fileContent=this.fs.readFileSync(path);
    res.setHeader('Content-Type',this.getContentType(path));
    res.write(fileContent);
    res.end();
  }
  execute(req,res) {
    if(!req.user){
      this.redirectTo(res,'./loginPage.html');
      return;
    }
    this.writeContentOfFile(res,req.url);
  }
}
module.exports=viewTodoHandler;
