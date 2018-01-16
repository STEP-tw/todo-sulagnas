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
  getIndexOfItem(id) {
    return this.todoItems.findIndex(item=>item.id==id);
  }
  deleteTodoItem(itemId) {
    let indexOfItem=this.getIndexOfItem(itemId);
    delete this.todoItems.splice(indexOfItem,1);
  }
  editTodoItem(itemId,editedTodoItem) {
    let indexOfItem=this.getIndexOfItem(itemId);
    this.todoItems[indexOfItem].item=editedTodoItem;
  }
  doneTodoItem(itemId) {
    let indexOfItem=this.getIndexOfItem(itemId);
    this.todoItems[indexOfItem].doneItem();
  }
  undoneTodoItem(itemId) {
    let indexOfItem=this.getIndexOfItem(itemId);
    this.todoItems[indexOfItem].undoneItem();
  }
  isDoneTodoItem(itemId) {
    let indexOfItem=this.getIndexOfItem(itemId);
    return this.todoItems[indexOfItem].done;
  }
}

module.exports=Todo;
