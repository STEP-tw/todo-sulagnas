let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe.skip('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe.skip('GET /',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'userName:');
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Make Your Todo');
        done();
      })
    })
  })
  describe.skip('GET /login',()=>{
    it('serves the login page',function () {
      request(app,{method:'GET',url:'/loginPage.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
      })
    })
  })

  describe.skip('GET /login',()=>{
    it('serves the login page with message for a failed login',function () {
      request(app,{method:'GET',url:'/loginPage.html',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName:');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
      })
    })
  })
  describe.skip('POST /loginPage.html',()=>{
    it('redirects to listTodos for valid user',done=>{
      request(app,{method:'POST',url:'/loginPage.html',body:'userName=sulagna'},res=>{
        th.should_be_redirected_to(res,'./listTodos.html');
        th.should_not_have_cookie(res,'message');
        done();
      });
    });
    it('redirects to loginPage.html with message for invalid user',done=>{
      request(app,{method:'POST',url:'/loginPage.html',body:'userName=badUser'},res=>{
        th.should_be_redirected_to(res,'./loginPage.html');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      });
    });
  });
})
