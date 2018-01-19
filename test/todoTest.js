let assert = require('chai').assert;
const Todo=require('../src/models/todo.js');

describe("a todo with it's id title description todo items and item count",function () {

  describe('todo has a title',function () {
    beforeEach(()=>{
      shopping=new Todo('shopping','have to buy things');
      shopping.addTodoItem('buy clothes');
    })
    it('has a title',function () {
      assert.equal(shopping.getTitle(),'shopping');
    })
    it('has a description',function () {
      assert.equal(shopping.getDescription(),'have to buy things');
    })
  })

  describe('todo item can be added',function () {
    beforeEach(()=>{
      shopping=new Todo('shopping','have to buy things');
      shopping.addTodoItem('buy clothes');
      shopping.addTodoItem('buy book');
    })
    it('can add the todo item in todo',function () {
      assert.equal(shopping.getTodoItem('buy book').getItem(),'buy book');
    })
  })

  describe('todo item can be deleted',function () {
    beforeEach(()=>{
      shopping=new Todo('shopping','have to buy things');
      shopping.addTodoItem('buy clothes');
      shopping.addTodoItem('buy mobile');
    })
    it('can delete any todo item in todo',function () {
      assert.isDefined(shopping.getTodoItem('buy clothes'));
      shopping.deleteTodoItem('buy clothes');
      assert.isUndefined(shopping.getTodoItem('buy clothes'));
    })
  })

  describe('todo item can be edited',function () {
    beforeEach(()=>{
      shopping=new Todo('shopping','have to buy things');
      shopping.addTodoItem('buy clothes');
      shopping.editTodoItem('buy clothes','buy book');
    })
    it('can change the todo item in todo',function () {
      assert.equal(shopping.getTodoItem('buy book').getItem(),'buy book');
    })
  })

  describe('it can say if the todo item is done or not',function () {
    beforeEach(()=>{
      shopping=new Todo('shopping','have to buy things');
      shopping.addTodoItem('buy clothes');
    })
    it('can return true if the todo item is done',function () {
      shopping.markAsDone('buy clothes');
      assert.isOk(shopping.isDone('buy clothes'));
    })
    it('can return false if the todo item is undone',function () {
      shopping.markAsUndone('buy clothes');
      assert.isNotOk(shopping.isDone('buy clothes'));
    })
  })
})
