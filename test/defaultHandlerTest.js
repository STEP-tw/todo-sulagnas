const assert = require('chai').assert;
const DeafultHandler = require('../handlers/defaultHandler.js');

describe('defaultHandler',()=>{
  beforeEach(()=>{
    defaultHandler = new DeafultHandler();
    res = {
      redirect:function(url){this.url = url;},
    };
    res.url = "";
  });
  it('should redirect to login page',()=>{
    defaultHandler.redirectTo(res,'./loginPage.html');
    assert.equal(res.url,'./loginPage.html');
  });
  it('should return a handler function',()=>{
    let handler = defaultHandler.getRequestHandler();
    assert.isFunction(handler);
  });
});
