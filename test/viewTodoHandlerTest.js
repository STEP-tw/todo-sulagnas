const assert = require('chai').assert;
const ViewTodoHandler = require('../handlers/viewTodoHandler.js');
const DummyFs = require('../src/utils/dummyFS.js');
const testHelper = require('./testHelper.js');

describe('viewTodoHandler',()=>{
  beforeEach(()=>{
    fs = new DummyFs([{name:'./public/somefile.html',content:'this is somefile'}]);
    viewTodoHandler = new ViewTodoHandler('public',fs);
    res = {
      redirect:function(url){this.url = url;},
      write:function(text){this.content = text;},
      setHeader:function(key,value){this.headers[key] = value;},
      end:()=>{}
    };
    res.content = res.url = "";
    res.headers = {};
  });
  it('should give the path of specific todo file when asked to get path',()=>{
    assert.equal(viewTodoHandler.getPath('/viewTodo.html'),"./public/viewTodo.html");
  });
  describe('getContentType',()=>{
    it("should return 'text/html' for html files",()=>{
      let extension = viewTodoHandler.getContentType('./something.html');
      assert.equal(extension,'text/html');
    });
    it("should return 'text/plain' for non-html files",()=>{
      let extension = viewTodoHandler.getContentType('./something.txt');
      assert.equal(extension,'text/plain');
    });
  });
  it('should respond with the content of the file',()=>{
    viewTodoHandler.writeContentOfFile(res,'/somefile.html');
    assert.deepEqual(res.headers,{'Content-Type':'text/html'});
    assert.equal(res.content,"this is somefile")
  });
});
