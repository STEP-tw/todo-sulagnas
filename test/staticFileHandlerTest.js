const assert = require('chai').assert;
const StaticFileHandler = require('../handlers/staticFileHandler.js');
const DummyFs = require('../src/utils/dummyFS.js');
const testHelper = require('./testHelper.js');

describe('staticFileHandler',()=>{
  beforeEach(()=>{
    fs=new DummyFs([{name:'./public/staticFile.html',content:'this is a static file'}]);
    staticFileHandler=new StaticFileHandler('public',fs);
    res = {
      redirect:function(url){this.url = url;},
      write:function(text){this.content = text;},
      setHeader:function(key,value){this.headers[key] = value;},
      end:()=>{}
    };
    res.content = res.url = res.statusCode = "";
    res.headers = {};
  });
  describe('getPath',()=>{
    it('should return path of the index file if url is "/"',()=>{
      let actual=staticFileHandler.getPath('/');
      assert.equal(actual,'./public/index.html');
    });
    it('should return complete path of the file if url is other than "/"',()=>{
      let actual=staticFileHandler.getPath('/viewTodo.html');
      assert.equal(actual,'./public/viewTodo.html');
    });
  });
  describe('getContentType',()=>{
    it("should return 'text/html' for html files",()=>{
      let extension = staticFileHandler.getContentType('./something.html');
      assert.equal(extension,'text/html');
    });
    it("should return 'text/css' for css files",()=>{
      let extension = staticFileHandler.getContentType('./something.css');
      assert.equal(extension,'text/css');
    });
    it("should return 'text/js' for js files",()=>{
      let extension = staticFileHandler.getContentType('./something.js');
      assert.equal(extension,'text/js');
    });
    it("should return 'img/jpg' for jpg files",()=>{
      let extension = staticFileHandler.getContentType('./something.jpg');
      assert.equal(extension,'img/jpg');
    });
    it("should return 'application/pdf' for pdf files",()=>{
      let extension = staticFileHandler.getContentType('./something.pdf');
      assert.equal(extension,'application/pdf');
    });
    it("should return 'img/gif' for gif files",()=>{
      let extension = staticFileHandler.getContentType('./something.gif');
      assert.equal(extension,'img/gif');
    });
    it("should return 'text/plain' for unknown file formats",()=>{
      let extension = staticFileHandler.getContentType('./something.txt');
      assert.equal(extension,'text/plain');
    });
  });
  describe('writeContentOfFile',()=>{
    it('should respond with the content of the file',()=>{
      staticFileHandler.writeContentOfFile(res,'./public/staticFile.html');
      assert.deepEqual(res.headers,{'Content-Type':'text/html'});
      assert.equal(res.content,"this is a static file")
    });
  })
  describe('handleIfFileNotExist',()=>{
    beforeEach(()=>{
      staticFileHandler.handleIfFileNotExist(res);
    });
    it('should make statusCode as 404',()=>{
      assert.equal(res.statusCode,404);
    });
    it('should say "file not found"',()=>{
      assert.equal(res.content,'file not found');
    });
  });
});
