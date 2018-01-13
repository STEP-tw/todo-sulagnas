let assert = require('chai').assert;
const User=require('../lib/user.js');

describe('a todo list with one or more more todos',function () {
  beforeEach(function () {
    sulagna=new User('sulagna');
    sulagna.addTodo('shopping','have to buy things');
    sulagna.addTodoItemInList('shopping','buy clothes');
    sulagna.addTodo('dinner','have to eat pizza');
    sulagna.addTodoItemInList('dinner','buy pizza');
  })
  describe('sulagna has todos in it',function () {
    it('has todos in it',function () {
      let todoTitleList=['shopping','dinner'];
      assert.isDefined(sulagna.todoList[todoTitleList[0]]);
      assert.isDefined(sulagna.todoList[todoTitleList[1]]);
    })
  })
})
