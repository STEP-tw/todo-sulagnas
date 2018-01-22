const assert = require('chai').assert;
const ListTodosHandler = require('../handlers/listTodosHandler.js');
const DummyFs = require('../src/utils/dummyFS.js');
const testHelper = require('./testHelper.js');

describe('listTodosHandler',()=>{
  beforeEach(()=>{
    fs = new DummyFs([{name:'./public/somefile.html',content:'this is somefile'}]);
    listTodosHandler = new ListTodosHandler('public',fs);
    res = {
      redirect:function(url){this.url = url;},
      write:function(text){this.content = text;},
      setHeader:function(key,value){this.headers[key] = value;},
      end:()=>{}
    };
    res.content = res.url = "";
    res.headers = {};
    req = {
      user : {}
    };
    req.user.toHtmlRow = ()=>{
      return "these are todos in html row format";
    }
  });
  describe('execute',()=>{
    it('should write all the todos as html rows',()=>{
      listTodosHandler.execute(req,res);
      assert.equal(res.content,"these are todos in html row format");
      assert.equal(res.headers['Content-Type'],'text/html');
    });
  });
});
