let DefaultHandler=require('./defaultHandler.js');

class staticFileHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
    this.fs=fs;
    this.root=root;
  }
  getPath(url) {
    if(url=='/'){
      return `./${this.root}${url}index.html`;
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
  writeContentOfFile(req,res,content) {
    res.write(content);
    res.end();
  }
  getContentOfFile(req,res,path) {
    let content=this.fs.readFileSync(path);
    res.setHeader('Content-Type',this.getContentType(path));
    this.writeContentOfFile(req,res,content);
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
      console.log(err.message);
      this.handleIfFileNotExist(res);
    }
  }
}

module.exports=staticFileHandler;
