let assert = require('chai').assert;
const Todo=require('../lib/todo.js');

describe("a todo with it's title description and todo items",function () {
  describe('todo has a title',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('has a title',function () {
      assert.equal(shopping.title,'shopping');
    })
  })

  describe('todo has a description',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('has a description',function () {
      assert.equal(shopping.description,'have to buy things');
    })
  })

  describe('todo item can be added',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can add the todo item in todo',function () {
      shopping.addTodoItem('buy book');
      let newTodoItem='buy book';
      assert.equal(shopping.todoItems[newTodoItem].item,'buy book');
    })
  })

  describe('todo item can be deleted',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can delete any todo item in todo',function () {
      shopping.deleteTodoItem('buy clothes');
      let deletedTodoItem='buy clothes';
      assert.isUndefined(shopping.todoItems[deletedTodoItem]);
    })
  })

  describe('todo item can be edited',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can change the todo item in todo',function () {
      shopping.editTodoItem('buy clothes','buy book');
      let newTodoItem='buy book';
      let oldTodoItem='buy clothes';
      assert.equal(shopping.todoItems[newTodoItem].item,'buy book');
      assert.isUndefined(shopping.todoItems[oldTodoItem]);
    })
  })

  describe('todo item can be selected or unselected',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can select any todo item',function () {
      shopping.selectTodoItem('buy clothes');
      let selectedTodoItem='buy clothes';
      assert.isOk(shopping.todoItems[selectedTodoItem].status);
    })
    it('can unselect any todo item',function () {
      shopping.unselectTodoItem('buy clothes');
      let unselectedTodoItem='buy clothes';
      assert.isNotOk(shopping.todoItems[unselectedTodoItem].status);
    })
  })
  
  describe('it can say if the todo item is selected or not',function () {
    let shopping=new Todo('shopping','have to buy things');
    shopping.addTodoItem('buy clothes');

    it('can return true if the todo item is selected',function () {
      shopping.selectTodoItem('buy clothes');
      let selectedTodoItem='buy clothes';
      assert.isOk(shopping.todoItems[selectedTodoItem].status);
    })
    it('can return false if the todo item is unselected',function () {
      shopping.unselectTodoItem('buy clothes');
      let unselectedTodoItem='buy clothes';
      assert.isNotOk(shopping.todoItems[unselectedTodoItem].status);
    })
  })
})
