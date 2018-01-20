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
  getAllItems(){
    let allItems = [];
    Object.keys(this.todoItems).forEach((title)=>{
      allItems.push(this.getTodoItem(title));
    })
    return allItems;
  }
  getDetails(){
    let details = {};
    details.title = this.title;
    details.description = this.description;
    details.todoItems = this.getAllItems();
    return details;
  }
}

module.exports=Todo;
