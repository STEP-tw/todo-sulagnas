let TodoItem=require('./todoItem.js');
class Todo {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.todoItems={};
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  editTitle(newTitle){
    this.title = newTitle;
  }
  editDescription(newDescription){
    this.description = newDescription;
  }
  addTodoItem(title) {
    let newTodoItem=new TodoItem(title);
    this.todoItems[title] = newTodoItem;
  }
  load(todoItems){
    todoItems.map(todoItem=>{
      this.addTodoItem(todoItem.item)
    })
  }
  getTodoItem(itemId) {
    return this.todoItems[itemId];
  }
  deleteTodoItem(itemId) {
    delete this.todoItems[itemId];
  }
  editTodoItem(itemId,editedTodoItem) {
    let item = this.getTodoItem(itemId);
    this.addTodoItem(editedTodoItem);
    this.deleteTodoItem(itemId);
  }
  markAsDone(itemId) {
    this.getTodoItem(itemId).markAsDone();
  }
  markAsUndone(itemId) {
    this.getTodoItem(itemId).markAsUndone();
  }
  isDone(itemId) {
    return this.getTodoItem(itemId).isDone();
  }
}

module.exports=Todo;
