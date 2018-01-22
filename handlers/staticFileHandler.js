let DefaultHandler=require('./defaultHandler.js');

class staticFileHandler extends DefaultHandler {
  constructor(root,fs) {
    super();
    this.fs=fs;
    this.root=root;
  }
  getPath(url) {
    if(url=='/'){
      return `./${this.root}/index.html`;
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
  writeContentOfFile(res,path) {
    let content=this.fs.readFileSync(path);
    res.setHeader('Content-Type',this.getContentType(path));
    res.statusCode=200;
    res.write(content);
    res.end();
  }
  handleIfFileNotExist(res) {
    res.statusCode=404;
    res.write('file not found');
    res.end();
  }
  execute(req,res) {
    let path=this.getPath(req.url);
    try{
      this.writeContentOfFile(res,path);
    }catch(err){
      console.error(err.message);
      this.handleIfFileNotExist(res);
    }
  }
}

module.exports=staticFileHandler;
