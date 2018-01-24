const chai = require('chai');
const assert = chai.assert;
const request = require('./requestSimulator.js');
const app = require('../app.js');
const th = require('./testHelper.js');
const DummyFs = require('../src/utils/dummyFS.js');
const SessionManager = require('../src/utils/sessionManager.js');
const TodoApp = require('../src/models/todoApp.js');

describe.skip('app',()=>{
  beforeEach(()=>{
    fs = new DummyFs([
      {name:'./data/userSessions.json',content:"{}"},
      {name:'./data/todo.json',content:`[
        {
          "userName": "sulagna",
          "todos": []
        },
        {
          "userName" : "pk",
          "todos" :[]
        }
      ]`}
    ]);
    let timeStamp = function(){
      return 1234;
    }
    app.sessionManager = SessionManager.createFrom('./data/userSessions.json',fs,timeStamp);
    app.todoApp = new TodoApp('./data/todo.json',fs);
    app.init();
  });
  describe('GET /bad',()=>{
    it('responds with 302',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,302);
        th.should_be_redirected_to(res,'/loginPage.html')
        done();
      });
    });
  });
  describe('GET /',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Make Your Todo');
        done();
      });
    });
  });
  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Make Your Todo');
        done();
      });
    });
  });
  describe('GET /login',()=>{
    it('serves the login page',(done)=>{
      request(app,{method:'GET',url:'/loginPage.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      });
    });
  });

  describe('GET /login',()=>{
    it('serves the login page with message for a failed login',(done)=>{
      request(app,{method:'GET',url:'/loginPage.html',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      });
    });
  });
  describe('POST /login',()=>{
    it('redirects to listTodos for valid user',(done)=>{
      request(app,{method:'POST',url:'/loginPage.html',body:'userName=sulagna'},res=>{
        th.should_be_redirected_to(res,'/listTodos.html');
        th.should_not_have_cookie(res,'message');
        done();
      });
    });
    it('redirects to loginPage.html with message for invalid user',(done)=>{
      request(app,{method:'POST',url:'/loginPage.html',body:'userName=badUser'},res=>{
        th.should_be_redirected_to(res,'/loginPage.html');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      });
    });
  });
  describe('GET /logout',()=>{
    beforeEach(()=>{
      app.sessionManager.createSessionFor('sulagna');
    })
    it('redirects to loginPage.html',(done)=>{
      request(app,{method:'GET',url:'/logout',headers:{'cookie':'sessionid=1234'}},res=>{
        th.should_be_redirected_to(res,'/loginPage.html');
        console.log(res.headers);
        th.should_have_expired_cookie(res,'sessionid');
        done();
      });
    });
  });
});
