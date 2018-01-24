const assert = require('chai').assert;
const MockedFs = require('../src/utils/mockedFS.js');

const logRequest = require('../src/lib/preprocessor.js').logRequest;
const redirectLoggedOutUserToLogin = require('../src/lib/preprocessor.js').redirectLoggedOutUserToLogin;

describe('preprocessors',()=>{
  describe('logRequest',()=>{
    beforeEach(()=>{
      fs=new MockedFs([{name:'request.log',content:''}]);
      req={
        method:'GET',
        url:'/loginPage.html',
        headers:{},
        cookies:{},
        body:{}
      };
      res={};
      timeStamp = function(){
        return `Fri Jan 19 2018 10:10:39 AM`;
      }
    });
    it('will write logs into a file',()=>{
      logRequest(req,res,()=>{},fs,timeStamp);
      let expected = `------------------------------\nFri Jan 19 2018 10:10:39 AM\nGET /loginPage.html\nHEADERS=> {}\nCOOKIES=> {}\nBODY=> {}\n`;
      assert.equal(fs.readFileSync('request.log'),expected)
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
      redirectLoggedOutUserToLogin(req,res,()=>{});
      assert.equal(res.redirectedTo,"/loginPage.html");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to loginPage.html`,()=>{
      req.url = '/loginPage.html';
      redirectLoggedOutUserToLogin(req,res,()=>{});
      assert.equal(res.redirectedTo,"");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to index.html`,()=>{
      req.url = '/index.html';
      redirectLoggedOutUserToLogin(req,res,()=>{});
      assert.equal(res.redirectedTo,"");
    });
    it(`should not redirect to './loginPage.html' when user is not loaded and requested to css/styleSheet`,()=>{
      req.url = '/css/styleSheet.css';
      redirectLoggedOutUserToLogin(req,res,()=>{});
      assert.equal(res.redirectedTo,"");
    });
  })
});
