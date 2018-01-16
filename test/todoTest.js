let assert = require('chai').assert;
const Todo=require('../src/models/todo.js');

describe("a todo with it's title description and todo items",function () {
  describe('todo has a title',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    it('has a title',function () {
      assert.equal(shopping.title,'shopping');
    })
  })

  describe('todo has a description',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('has a description',function () {
      assert.equal(shopping.description,'have to buy things');
    })
  })

  describe('todo item can be added',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.addTodoItem('buy book');
    it('can add the todo item in todo',function () {
      assert.equal(shopping.todoItems[1].item,'buy book');
    })
  })

  describe('todo item can be deleted',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.addTodoItem('buy mobile');

    it('can delete any todo item in todo',function () {
      assert.equal(shopping.todoItems.length,2);
      shopping.deleteTodoItem(0);
      assert.equal(shopping.todoItems.length,1);
      assert.equal(shopping.todoItems[0].item,'buy mobile');
    })
  })

  describe('todo item can be edited',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.editTodoItem(0,'buy book');

    it('can change the todo item in todo',function () {
      assert.equal(shopping.todoItems[0].item,'buy book');
    })
  })

  describe('todo item can be done or undone',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can select any todo item',function () {
      shopping.markAsDone(0);
      assert.isOk(shopping.todoItems[0].done);
    })
    it('can unselect any todo item',function () {
      shopping.markAsUndone(0);
      assert.isNotOk(shopping.todoItems[0].done);
    })
  })

  describe('it can say if the todo item is done or not',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can return true if the todo item is done',function () {
      shopping.markAsDone(0);
      assert.isOk(shopping.isDone(0));
    })
    it('can return false if the todo item is undone',function () {
      shopping.markAsUndone(0);
      assert.isNotOk(shopping.isDone(0));
    })
  })
})
