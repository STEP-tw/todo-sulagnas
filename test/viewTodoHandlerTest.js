const assert = require('chai').assert;
const DummyFS = require('../src/utils/dummyFS.js');
const ViewTodoHandler = require('../handlers/viewTodoHandler.js');

describe('viewTodoHandler',()=>{
  beforeEach(()=>{
    fs = new DummyFS([{name:"./templates/viewTodo.html",content:"todoId viewTodo"}]);
    req = {};
    req.user = {
      getTodo : function(todoId){
        if(todoId == 'shopping') return {
          title : "shopping",
          toHtml : function(){
            return "this is html code for todo";
          }
        }
      }
    }
    req.body={};
    res = {
      write : function(text){
        this.content = text;
      },
      end : function () {},
      setHeader : function(key,value){
        this.header[key] = value;
      }
    };
    res.content='';
    res.statusCode = "";
    res.header = {};
    viewTodoHandler = new ViewTodoHandler(fs);
  });
  describe('execute',()=>{
    it('if todo exists, it will write the todo in html format',()=>{
      req.body.todoId='shopping';
      viewTodoHandler.execute(req,res);
      assert.equal(res.content,'shopping this is html code for todo');
      assert.equal(res.statusCode,200);
      assert.deepEqual(res.header,{'Content-type':'text/html'});
    });
    it("if todo doesn't exists,it will respond with 'file not found'",()=>{
      req.body.todoId = "bad";
      viewTodoHandler.execute(req,res);
      assert.equal(res.content,'file not found');
      assert.equal(res.statusCode,404);
    })
  })
});
