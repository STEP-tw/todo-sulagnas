let DefaultHandler=require('./defaultHandler.js');

class GetLoginHandler extends DefaultHandler {
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
  execute(req,res) {
    let path=this.getPath();
    let content=this.fs.readFileSync(path);
    res.setHeader('Content-Type',this.getContentType(path));
    res.write(req.cookies.message||'');
    res.write(content);
  }
}
module.exports=GetLoginHandler;
