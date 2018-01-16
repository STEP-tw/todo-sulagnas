let TodoItem=require('./todoItem.js');
class Todo {
  constructor(id,title,description) {
    this.id=id;
    this.title=title;
    this.description=description;
    this.todoItems=[];
    this.itemCount=0;
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getCurrentItemId() {
    return this.itemCount++;
  }
  addTodoItem(todoItem) {
    let currentItemId=this.getCurrentItemId();
    let newTodoItem=new TodoItem(currentItemId,todoItem);
    this.todoItems.push(newTodoItem);
  }
  getItemIndex(id) {
    return this.todoItems.findIndex(item=>item.id==id);
  }
  getTodoItem(itemId) {
    let itemIndex=this.getItemIndex(itemId);
    return this.todoItems[itemIndex];
  }
  deleteTodoItem(itemId) {
    let itemIndex=this.getItemIndex(itemId);
    delete this.todoItems.splice(itemIndex,1);
  }
  editTodoItem(itemId,editedTodoItem) {
    let itemIndex=this.getItemIndex(itemId);
    this.todoItems[itemIndex].editTodoItem(editedTodoItem);
  }
  markAsDone(itemId) {
    let itemIndex=this.getItemIndex(itemId);
    this.todoItems[itemIndex].markAsDone();
  }
  markAsUndone(itemId) {
    let itemIndex=this.getItemIndex(itemId);
    this.todoItems[itemIndex].markAsUndone();
  }
  isDone(itemId) {
    let itemIndex=this.getItemIndex(itemId);
    return this.todoItems[itemIndex].done;
  }
}

module.exports=Todo;
