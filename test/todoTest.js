let assert = require('chai').assert;
const TodoItem=require('../lib/todoItem.js');
const Todo=require('../lib/todo.js');

describe.skip("a todo with it's title description and todo items",function () {
  beforeEach(function () {
    clothes=new TodoItem('clothes');
    shopping=new Todo('shopping','have to buy things','clothes');
  })
  describe('todo item can be added',function () {
    it('can add the todo item in todo',done=>{
      shopping.addTodoItem('book');
      assert.equal(sho)
    })
  })
})
