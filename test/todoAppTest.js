let assert = require('chai').assert;
const TodoApp=require('../src/models/todoApp.js');

describe('Todo App',()=>{
  beforeEach(()=>{
    todoApp = new TodoApp();
  });
  describe('addUser',()=>{
    it('should create user with no todos when didnt give any initial todos',()=>{
      let user = todoApp.addUser('sulagna');
      assert.equal(user.getUserName(),"sulagna");
      assert.deepEqual(user.getAllTodos(),[]);
    });
    it('should create user with some todos when todos are given',()=>{
      let initialTodos = [
        {
          title:'shopping',
          description:"have to buy things",
          todoItems:[
            {item:'buy clothes',done:false},
            {item:'buy mobile',done:false}
          ]}
      ];
      let user = todoApp.addUser('sulagna',initialTodos);
      assert.deepEqual(initialTodos,user.getAllTodos())
    });
  });
  describe('getUser',()=>{
    it('should get the user',()=>{
      todoApp.addUser('sulagna');
      let user=todoApp.getUser('sulagna');
      assert.equal(user.userName,'sulagna');
    })
  })
})
