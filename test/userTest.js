let assert = require('chai').assert;
const User=require('../src/models/user.js');

describe('a user with id,userName,todoList of one or more todos',function () {

  describe('a user will have id userName and todos.length',function () {
    let user=new User('sulagna');

    it('has one userName',function () {
      assert.equal(user.getUserName(),'sulagna');
    })
  })

  describe('user can add todo in it',function () {
    beforeEach(()=>{
      user=new User('sulagna');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
      user.addTodo('play','have to play');
      user.addTodoItem('play','play cricket');
    })
    it('can add todo in it',function () {
      assert.equal(user.getTitle('play'),'play');
      assert.equal(user.getDescription('play'),'have to play');
    })
    it('can add todo items in it',function () {
      assert.equal(user.getTitle('play'),'play');
      assert.equal(user.getDescription('play'),'have to play');
      assert.equal(user.getTodoItem('play','play cricket').getItem(),'play cricket');
    })
  })

  describe('user can edit todo title or description',function () {
    beforeEach(()=>{
      user=new User('sulagna');
      user.addTodo('shopping','have to buy things');
    })
    it('user can edit todo title',function () {
      user.editTitle('shopping','buy things');
      assert.equal(user.getTitle('buy things'),'buy things');
    })
    it('user can edit todo description',function () {
      user.editDescription('shopping','need to buy things');
      assert.equal(user.getDescription('shopping'),'need to buy things');
    })
  })

  describe('user can delete one todo',function () {
    beforeEach(()=>{
      user=new User('sulagna');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
      user.addTodo('walk','walking is good for health');
      user.addTodoItem('walk','morning walk');
    })
    it('can delete one todo',function () {
      user.deleteTodo('shopping');
      assert.isUndefined(user.getTodo('shopping'));
      assert.isDefined(user.getTodo('walk'));
    })
  })

  describe('user can add,delete or edit todo item in a todo',function () {
    beforeEach(()=>{
      user=new User('sulagna');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
      user.addTodoItem('shopping','buy mobile');
    })
    it('can add todo item in a todo',function () {
      assert.equal(user.getTodoItem('shopping','buy mobile').getItem(),'buy mobile');
    })
    it('can delete todo item in a specific todo',function () {
      user.deleteTodoItem('shopping','buy clothes');
      assert.isUndefined(user.getTodoItem('shopping','buy clothes'));
      assert.isDefined(user.getTodoItem('shopping','buy mobile'));
    })
    it('can edit todo item in a specific todo',function () {
      user.editTodoItem('shopping','buy mobile','buy samsung mobile');
      assert.equal(user.getTodoItem('shopping','buy samsung mobile').getItem(),'buy samsung mobile');
    })
  })

  describe('user can know if any item is done or not',function () {
    beforeEach(()=>{
      user=new User('user');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
      user.addTodoItem('shopping','buy mobile');
    })
    it('user can know if they have done any item',function () {
      user.markAsDone('shopping','buy clothes');
      assert.isOk(user.isDone('shopping','buy clothes'));
    })
    it('user can know if they have not done any item',function () {
      user.markAsUndone('shopping','buy mobile');
      assert.isNotOk(user.isDone('shopping','buy mobile'));
    })
  })

  describe('getAllTodos',()=>{
    beforeEach(()=>{
      user=new User('user');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
      user.addTodoItem('shopping','buy mobile');
    })
    it('should return the todos in a list',()=>{
      let expected = [{
        title:'shopping',
        description:"have to buy things",
        todoItems:[
          {item:'buy clothes',done:false},
          {item:'buy mobile',done:false}
        ]}
      ];
      assert.deepEqual(user.getAllTodos(),expected);
    });
  });

  describe("getDetails",()=>{
    beforeEach(()=>{
      user=new User('user');
      user.addTodo('shopping','have to buy things');
      user.addTodoItem('shopping','buy clothes');
    })
    it('should return an object contains user details',()=>{
      let expected = {
        userName:'user',
        todos:[
          {
            title:"shopping",
            description:'have to buy things',
            todoItems:[{item:'buy clothes',done:false}]
          }
        ]
      };
      assert.deepEqual(user.getDetails(),expected);
    })
  })

  describe('load',()=>{
    beforeEach(()=>{
      user=new User('user');
      let todos = [
        {
          'title':'shopping',
          description:"have to buy things",
          todoItems:[
            {item:'buy clothes',done:false},
            {item:'buy mobile',done:false}
          ]
        }
      ];
      user.load(todos)
    })
    it("should add the todos to user object",()=>{
      let expected = [
        {
          'title':'shopping',
          description:"have to buy things",
          todoItems:[
            {item:'buy clothes',done:false},
            {item:'buy mobile',done:false}
          ]
        }
      ];
      assert.deepEqual(user.getAllTodos(),expected);
    })
  })

  describe('toHtmlRow',()=>{
    beforeEach(()=>{
      user=new User('sulagna');
      let todos = [
        {
          'title':'shopping',
          description:"have to buy things",
          todoItems:[
            {item:'buy clothes',done:false},
            {item:'buy mobile',done:false}
          ]
        }
      ];
      user.load(todos);
    })
    it('should return todo titles in html row',()=>{
      let expected = '<table><tr><td><a href="/viewTodo/shopping">shopping</a></td><td><a href = "/delete/shopping">delete</a></td></tr></table>';
      assert.equal(user.toHtmlRow(),expected);
    })
  })
})
