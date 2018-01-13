let assert = require('chai').assert;
const User=require('../lib/user.js');

describe('a todo list with one or more more todos',function () {
  beforeEach(function () {
    user=new User('user');
    user.addTodo('shopping','have to buy things');
    user.addTodoItemInList('shopping','buy clothes');
    user.addTodo('dinner','have to eat pizza');
    user.addTodoItemInList('dinner','buy pizza');
  })

  describe('user has todos in it',function () {
    it('has todos in it',function () {
      let todoTitleList=['shopping','dinner'];
      assert.isDefined(user.todoList[todoTitleList[0]]);
      assert.isDefined(user.todoList[todoTitleList[1]]);
    })
  })

  describe('user can add todo in it',function () {
    it('can add todo in it',function () {
      user.addTodo('play','have to play');
      assert.equal(user.todoList.play.title,'play');
      assert.equal(user.todoList.play.description,'have to play');
    })
    it('can add todo items in it',function () {
      user.addTodo('play','have to play');
      user.addTodoItemInList('play','play cricket');
      let todoItem='play cricket';
      assert.equal(user.todoList.play.title,'play');
      assert.equal(user.todoList.play.description,'have to play');
      assert.equal(user.todoList.play.todoItems[todoItem].item,'play cricket');
    })
  })

  describe('user can add,delete or edit todo item in a todo',function () {
    it('can add todo item in a specific todo',function () {
      user.addTodoItemInList('shopping','buy mobile');
      let todoItem='buy mobile';
      assert.equal(user.todoList.shopping.todoItems[todoItem].item,'buy mobile');
    })
    it('can delete todo item in a specific todo',function () {
      user.addTodoItemInList('shopping','buy mobile');
      user.deleteTodoItemInList('shopping','buy mobile');
      let todoItem='buy mobile';
      assert.isUndefined(user.todoList.shopping.todoItems[todoItem]);
    })
    it('can edit todo item in a specific todo',function () {
      user.editTodoItemInList('shopping','buy clothes','buy mobile');
      let newTodoItem='buy mobile';
      assert.equal(user.todoList.shopping.todoItems[newTodoItem].item,'buy mobile');
    })
  })

  describe('user can select or unselect todo items in their todo',function () {
    it('can select any todoItem in their todo',function () {
      user.selectTodoItemInList('shopping','buy clothes');
      let todoItem='buy clothes';
      assert.equal(user.todoList.shopping.todoItems[todoItem].status,true);
    })
    it('can unselect any todoItem in their todo',function () {
      user.unselectTodoItemInList('shopping','buy clothes');
      let todoItem='buy clothes';
      assert.equal(user.todoList.shopping.todoItems[todoItem].status,false);
    })
  })

  describe('user can know if any item is selected or not',function () {
    it('user can know if they have selected any item',function () {
      user.selectTodoItemInList('shopping','buy clothes');
      user.isSelectedTodoItemInList('shopping','buy clothes');
      let todoItem='buy clothes';
      assert.equal(user.todoList.shopping.todoItems[todoItem].status,true);
    })
    it('user can know if they have not selected any item',function () {
      user.unselectTodoItemInList('shopping','buy clothes');
      user.isSelectedTodoItemInList('shopping','buy clothes');
      let todoItem='buy clothes';
      assert.equal(user.todoList.shopping.todoItems[todoItem].status,false);
    })
  })
})
