let fs = require('fs');

const getContentType=function (fileName) {
  let extension=fileName.split('.').pop();
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
};

const getPath=function (req) {
  if(req.url=='/'||req.url=='/index.html'){
    return './public/index.html';
  }
  return req.url.replace('/','./public/');
};

const writeContentOfFile=function (req,res,path,content) {
  res.setHeader('Content-Type',getContentType(path));
  if(path=='./public/guestBook.html')
    res.write(`<p><b>hello ${req.user.name}</b></p>`);
  res.write(content);
  res.end();
};

const getContentOfFile=function (req,res,path) {
  let content=fs.readFileSync(path);
  writeContentOfFile(req,res,path,content);
};

const handleIfFileNotExist=function (res) {
  res.statusCode=404;
  res.write('file not found');
  res.end();
};

const serveFile=function (req,res) {
  let path=getPath(req);
  try{
    getContentOfFile(req,res,path);
  }catch(err){
    handleIfFileNotExist(res);
  }
};

module.exports=serveFile;
