let assert = require('chai').assert;
const TodoApp=require('../src/models/todoApp.js');

describe('a todoApp with one or more users',function () {

  describe('todoApp has a list of users',function () {
    it('has a list containing one or more users',function () {
      let todoApp=new TodoApp();
      todoApp.addUser('sulagna');
      todoApp.addUser('tina');
      assert.equal(todoApp.users.length,2);
    })
  })
  describe('todoApp should give a user by his id',function () {
    it('can give user by its id',function () {
      let todoApp=new TodoApp();
      todoApp.addUser('sulagna');
      assert.equal(todoApp.getUser(0).userName,'sulagna');
    })
  })
})
