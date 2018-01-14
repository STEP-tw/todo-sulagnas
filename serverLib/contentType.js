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

module.exports=getContentType;
