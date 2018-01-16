let assert = require('chai').assert;
const TodoItem=require('../appModels/todoItem.js');

describe('todo item has one item and a id',function () {
  let storyBook=new TodoItem(1,'buy story book');

  it('has one item',function () {
    assert.equal(storyBook.item,'buy story book');
  })
  it('has one id',function () {
    assert.equal(storyBook.id,1);
  })
})

describe('todoItem can be selected on not selected',function (){
  let storyBook=new TodoItem(1,'buy story book');

  it('can select one todo item',function(){
    storyBook.doneItem();
    assert.equal(storyBook.done,true);
  })
  it('can unselect one todo item',function(){
    storyBook.undoneItem();
    assert.equal(storyBook.done,false);
  })
})
