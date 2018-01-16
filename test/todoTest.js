let assert = require('chai').assert;
const Todo=require('../src/models/todo.js');

describe("a todo with it's id title description todo items and item count",function () {

  describe('todo has a id',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    it('has an id',function () {
      assert.equal(shopping.getId(),1);
    })
  })

  describe('todo has a title',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    it('has a title',function () {
      assert.equal(shopping.getTitle(),'shopping');
    })
  })

  describe('todo has a description',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('has a description',function () {
      assert.equal(shopping.getDescription(),'have to buy things');
    })
  })

  describe('todo item can be added',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.addTodoItem('buy book');
    it('can add the todo item in todo',function () {
      assert.equal(shopping.getTodoItem(1).getItem(),'buy book');
    })
  })

  describe('item count will increment every time user add one item',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.addTodoItem('buy book');
    shopping.addTodoItem('buy pen');
    it('can add the todo item in todo',function () {
      assert.equal(shopping.itemCount,3);
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
      assert.equal(shopping.getTodoItem(1).getItem(),'buy mobile');
    })
  })

  describe('todo item can be edited',function () {
    let shopping=new Todo(1,'shopping','have to buy things');
    shopping.addTodoItem('buy clothes');
    shopping.editTodoItem(0,'buy book');

    it('can change the todo item in todo',function () {
      assert.equal(shopping.getTodoItem(0).getItem(),'buy book');
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
