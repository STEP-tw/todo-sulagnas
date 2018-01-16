let assert = require('chai').assert;
const User=require('../src/models/user.js');

describe('a todo list with one or more more todos',function () {

  describe('user has todos in it',function () {
    it('has todos in it',function () {
      let user=new User(1,'sulagna');
      user.addTodo('shopping','have to buy things');
      user.addTodo('dinner','have to eat pizza');
      user.addTodoItem(0,'buy clothes');
      user.addTodoItem(1,'buy pizza');
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
      assert.equal(user.todos[1].title,'play');
      assert.equal(user.todos[1].description,'have to play');
    })
    it('can add todo items in it',function () {
      assert.equal(user.todos[1].title,'play');
      assert.equal(user.todos[1].description,'have to play');
      assert.equal(user.todos[1].todoItems[0].item,'play cricket');
    })
  })

  describe('user can add,delete or edit todo item in a todo',function () {
    let user=new User(1,'sulagna');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodoItem(0,'buy mobile');

    it('can add todo item in a todo',function () {
      assert.equal(user.todos[0].todoItems[1].item,'buy mobile');
    })
    it('can delete todo item in a specific todo',function () {
      assert.equal(user.todos[0].todoItems.length,2);
      user.deleteTodoItem(0,1);
      assert.equal(user.todos[0].todoItems.length,1);
    })
    it('can edit todo item in a specific todo',function () {
      user.editTodoItem(0,0,'buy mobile');
      assert.equal(user.todos[0].todoItems[0].item,'buy mobile');
    })
  })

  describe('user can done or undone todo items in their todo',function () {
    let user=new User(1,'user');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodoItem(0,'buy mobile');

    it('can done any todoItem in their todo',function () {
      user.markAsDone(0,0);
      assert.isOk(user.todos[0].todoItems[0].done);
    })
    it('can undone any todoItem in their todo',function () {
      user.markAsUndone(0,1);
      assert.isNotOk(user.todos[0].todoItems[1].done);
    })
  })

  describe('user can know if any item is doneed or not',function () {
    let user=new User(1,'user');
    user.addTodo('shopping','have to buy things');
    user.addTodoItem(0,'buy clothes');
    user.addTodoItem(0,'buy mobile');

    it('user can know if they have doneed any item',function () {
      user.markAsDone(0,0);
      assert.isOk(user.isDone(0,0));
    })
    it('user can know if they have not doneed any item',function () {
      user.markAsUndone(0,1);
      assert.isNotOk(user.isDone(0,1));
    })
  })
})
