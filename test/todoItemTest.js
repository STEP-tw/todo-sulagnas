let assert = require('chai').assert;
const TodoItem=require('../src/models/todoItem.js');

describe('todo item has one item ,status and a id',function () {
  let storyBook=new TodoItem(1,'buy story book');

  it('has one item',function () {
    assert.equal(storyBook.item,'buy story book');
  })
  it('has one id',function () {
    assert.equal(storyBook.id,1);
  })
})

describe('todoItem can be edited',function () {
  let storyBook=new TodoItem(1,'buy story book');

  it('todoItem can be edited',function () {
    storyBook.editTodoItem('buy two story book');
    assert.equal(storyBook.item,'buy two story book');
  })
})

describe('todoItem can be selected on not selected',function (){
  let storyBook=new TodoItem(1,'buy story book');

  it('can select one todo item',function(){
    storyBook.markAsDone();
    assert.equal(storyBook.done,true);
  })
  it('can unselect one todo item',function(){
    storyBook.markAsUndone();
    assert.equal(storyBook.done,false);
  })
})
