const assert = require('chai').assert;
const DummyFs = require('../src/utils/dummyFS.js');

const logRequest = require('../src/lib/preprocessor.js').logRequest;
const redirectLoggedOutUserToLogin = require('../src/lib/preprocessor.js').redirectLoggedOutUserToLogin;

describe('preprocessors',()=>{
  describe.skip('logRequest',()=>{
    beforeEach(()=>{
      fs=new DummyFs([{name:'request.log',content:''}]);
      let req={
        method:'GET',
        url:'./loginPage.html',
        headers:{},
        cookies:{},
        body:{}
      };
      let res={};
      timeStamp = function(){
        return `Fri Jan 19 2018 10:10:39 AM`;
      }
    })
    it('will write logs into a file',()=>{
      let expected = `Fri Jan 19 2018 10:10:39 AM
      GET /loginPage.html
      HEADERS=> {}
      COOKIES=> {}
      BODY=> {}`;
      assert.equal(logRequest)
    })
  })
  describe("redirectLoggedOutUserToLogin",()=>{
    beforeEach(()=>{
      req = {
        urlIsOneOf:function(list){
          return list.includes(this.url);
        }
      }
      req.url = "";
      res = {
        redirect:function(url){
          this.redirectedTo = url;
        }
      };
      res.redirectedTo = "";
    });
    it(`should redirect to './loginPage.html' when no user is loaded`,()=>{
      req.url = './listTodos.html';
      redirectLoggedOutUserToLogin(req,res);
      assert.equal(res.redirectedTo,"./loginPage.html");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to loginPage.html`,()=>{
      req.url = '/loginPage.html';
      redirectLoggedOutUserToLogin(req,res);
      assert.equal(res.redirectedTo,"");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to index.html`,()=>{
      req.url = '/index.html';
      redirectLoggedOutUserToLogin(req,res);
      assert.equal(res.redirectedTo,"");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to css/styleSheet`,()=>{
      req.url = '/css/styleSheet.css';
      redirectLoggedOutUserToLogin(req,res);
      assert.equal(res.redirectedTo,"");
    });
  })
});
