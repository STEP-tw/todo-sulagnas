let assert = require('chai').assert;
const TodoItem=require('../lib/todoItem.js');

describe('todoItem can be selected on not selected',function (){
  beforeEach(function () {
    storyBook=new TodoItem('buy story book');
  })
  it('can select one todo item',done=>{
    storyBook.selectItem();
    assert.equal(storyBook.status,true);
    done();
  })
  it('can unselect one todo item',done=>{
    storyBook.unselectItem();
    assert.equal(storyBook.status,false);
    done();
  })
})
