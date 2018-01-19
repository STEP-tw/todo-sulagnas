let assert = require('chai').assert;
const User=require('../src/models/user.js');

describe('a user with id,userName,todoList of one or more todos',function () {

  describe('a user will have id userName and todos.length',function () {
    let user=new User(1,'sulagna');

    it('has one id',function () {
      assert.equal(user.getId(),1);
    })
    it('has one userName',function () {
      assert.equal(user.getUserName(),'sulagna');
    })
    it('has keeps track on count of todos',function () {
      user.addTodo('shopping','have to buy things');
      user.addTodo('dinner','have to eat pizza');
      assert.equal(user.todos.length,2);
    })
  })

  describe('user can add todo in it',function () {
    let user=new User(1,'sulagna');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodo('play','have to play');
    user.addTodoItem(1,'play cricket');

    it('can add todo in it',function () {
      assert.equal(user.getTitle(1),'play');
      assert.equal(user.getDescription(1),'have to play');
    })
    it('can add todo items in it',function () {
      assert.equal(user.getTitle(1),'play');
      assert.equal(user.getDescription(1),'have to play');
      assert.equal(user.getTodoItem(1,0).getItem(),'play cricket');
    })
  })

  describe('user can edit todo title or description',function () {
    let user=new User(1,'sulagna');
    user.addTodo('shopping','have to buy things');

    it('user can edit todo title',function () {
      user.editTitle(0,'buy things');
      assert.equal(user.getTitle(0),'buy things');
    })
    it('user can edit todo description',function () {
      user.editDescription(0,'need to buy things');
      assert.equal(user.getDescription(0),'need to buy things');
    })
  })

  describe('user can delete one todo',function () {
    let user=new User(1,'sulagna');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodo('walk','walking is good for health');
    user.addTodoItem(0,'morning walk');

    it('can delete one todo',function () {
      assert.equal(user.todos.length,2)
      user.deleteTodo(0);
      assert.equal(user.todos.length,1);
      assert.isUndefined(user.getTodo(0));
      assert.isDefined(user.getTodo(1));
    })
  })

  describe('user can add,delete or edit todo item in a todo',function () {
    let user=new User(1,'sulagna');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodoItem(0,'buy mobile');

    it('can add todo item in a todo',function () {
      assert.equal(user.getTodoItem(0,1).getItem(),'buy mobile');
    })
    it('can delete todo item in a specific todo',function () {
      assert.equal(user.todos[0].todoItems.length,2);
      user.deleteTodoItem(0,0);
      assert.equal(user.todos[0].todoItems.length,1);
      assert.isUndefined(user.getTodoItem(0,0));
      assert.isDefined(user.getTodoItem(0,1));
    })
    it('can edit todo item in a specific todo',function () {
      user.editTodoItem(0,1,'buy mobile');
      assert.equal(user.getTodoItem(0,1).getItem(),'buy mobile');
    })
  })

  describe('user can know if any item is done or not',function () {
    let user=new User(1,'user');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodoItem(0,'buy mobile');

    it('user can know if they have done any item',function () {
      user.markAsDone(0,0);
      assert.isOk(user.isDone(0,0));
    })
    it('user can know if they have not done any item',function () {
      user.markAsUndone(0,1);
      assert.isNotOk(user.isDone(0,1));
    })
  })
})
