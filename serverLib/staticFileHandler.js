let fs = require('fs');
let getContentType=require('./contentType.js');

const getPath=function (url) {
  if(url=='/'||url=='/index.html'){
    return './public/index.html';
  }
  return url.replace('/','./public/');
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
  let path=getPath(req.url);
  try{
    getContentOfFile(req,res,path);
  }catch(err){
    handleIfFileNotExist(res);
  }
};

module.exports=serveFile;
