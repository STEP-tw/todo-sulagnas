let DefaultHandler=require('./defaultHandler.js');

class staticFileHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
    this.fs=fs;
    this.root=root;
  }
  getPath(url) {
    if(url=='/'){
      return `./${this.root}${url}loginPage.html`;
    }
    return `./${this.root}${url}`;
  }
  getContentType(filePath) {
    let extension=filePath.split('.').pop();
    let contentType={
      'html':'text/html',
      'css':'text/css',
      'js':'text/js',
      'pdf':'application/pdf',
      'gif':'img/gif',
      'jpg':'img/jpg'
    }
    if(contentType[extension])
      return contentType[extension];
    return 'text/plain';
  }
  writeContentOfFile(req,res,path,content) {
    res.setHeader('Content-Type',this.getContentType(path));
    if(path=='./public/guestBook.html')
      res.write(`<p><b>hello ${req.user.name}</b></p>`);
    res.write(content);
    res.end();
  }
  getContentOfFile(req,res,path) {
    let content=this.fs.readFileSync(path);
    this.writeContentOfFile(req,res,path,content);
  }
  handleIfFileNotExist(res) {
    res.statusCode=404;
    res.write('file not found');
    res.end();
  }
  execute(req,res) {
    let path=this.getPath(req.url);
    try{
      this.getContentOfFile(req,res,path);
    }catch(err){
      this.handleIfFileNotExist(res);
    }
  }
}

module.exports=staticFileHandler;
