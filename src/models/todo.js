let TodoItem=require('./todoItem.js');
class Todo {
  constructor(id,title,description) {
    this.id=id;
    this.title=title;
    this.description=description;
    this.todoItems=[];
    this.itemCount=0;
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
  deleteTodoItem(itemId) {
    let indexOfItem=this.getItemIndex(itemId);
    delete this.todoItems.splice(indexOfItem,1);
  }
  editTodoItem(itemId,editedTodoItem) {
    let indexOfItem=this.getItemIndex(itemId);
    this.todoItems[indexOfItem].editTodoItem(editedTodoItem);
  }
  markAsDone(itemId) {
    let indexOfItem=this.getItemIndex(itemId);
    this.todoItems[indexOfItem].markAsDone();
  }
  markAsUndone(itemId) {
    let indexOfItem=this.getItemIndex(itemId);
    this.todoItems[indexOfItem].markAsUndone();
  }
  isDone(itemId) {
    let indexOfItem=this.getItemIndex(itemId);
    return this.todoItems[indexOfItem].done;
  }
}

module.exports=Todo;
