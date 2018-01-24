const DummyFS=require('../src/utils/mockedFS.js');
const SessionManager = require('../src/utils/sessionManager.js');
const assert = require('chai').assert;

describe('sessionManger',()=>{
  beforeEach(()=>{
    timeStamp = ()=>1234;
    fs = new DummyFS([{name:'./todo.json',content:`{
      "1516447754371": {
        "Id": 1516447754371,
        "user": "sulagna"
      }
    }`}]);
  });
  describe('createFrom',()=>{
    describe('init',()=>{
      it('should load users from file if file having userdata',()=>{
        let sm = SessionManager.createFrom('./todo.json',fs,timeStamp);
        assert.isNotEmpty(sm.loggedInUsers);
      });
      it("should assign empty object to loggedInUsers if file is empty",()=>{
        fs.writeFileSync('./todo.json',"{}");
        let sm = SessionManager.createFrom('./todo.json',fs,timeStamp);
        assert.isEmpty(sm.loggedInUsers);
      });
      it("should assign empty object to loggedInUsers if file is not exist",()=>{
        let sm = SessionManager.createFrom('./tod.json',fs,timeStamp);
        assert.isEmpty(sm.loggedInUsers);
      });
    });
  });
  describe('createSessionFor,save',()=>{
    beforeEach(()=>{
      fs.writeFileSync('./todo.json','{}');
      sm = SessionManager.createFrom('./todo.json',fs,timeStamp);
    })
    it("should create a session for user",()=>{
      let session = sm.createSessionFor({userName:"sulagna"});
      assert.equal(session.Id,1234)
    });
    it('should write into a file',()=>{
      let session = sm.createSessionFor("sulagna");
      let expected = {
        1234:{
          Id:1234,
          user: "sulagna"
        }
      };
      let actual = JSON.parse(fs.readFileSync('./todo.json'));
      assert.deepEqual(actual,expected);
    });
  })
  describe('loadSessionBy',()=>{
    beforeEach(()=>{
      fs = new DummyFS([{name:'./todo.json',content:`{
        "1234":{
          "Id":1234,
          "user":{
            "userName" : "sulagna"
          }
        }
      }`}]);
      sm = SessionManager.createFrom('./todo.json',fs,timeStamp)
    });
    it('should load user by sessionId',()=>{
      let expected = {
        Id:1234,
        user:{
          userName : "sulagna"
        }
      };
      let actual = sm.loadSessionBy(1234);
      assert.deepEqual(actual,expected);
    })
  })
  describe('removeSessionBy',()=>{
    beforeEach(()=>{
      fs = new DummyFS([{name:'./todo.json',content:`{
        "1234":{
          "Id":1234,
          "user":{
            "userName" : "sulagna"
          }
        }
      }`}]);
      sm = SessionManager.createFrom('./todo.json',fs,timeStamp);
    });
    it("should remove session of user by using sessionId",()=>{
      assert.isDefined(sm.loadSessionBy(1234));
      sm.removeSessionBy(1234);
      assert.isUndefined(sm.loadSessionBy(1234));
    });
  })
})
