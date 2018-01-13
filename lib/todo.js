let TodoItem=require('./todoItem.js');
class Todo {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.todoItems={};
  }
  addTodoItem(newTodoItem) {
    this.todoItems[newTodoItem]=new TodoItem(newTodoItem);
  }
  deleteTodoItem(requiredTodoItem) {
    delete this.todoItems[requiredTodoItem];
  }
  editTodoItem(requiredTodoItem,editedTodoItem) {
    this.deleteTodoItem(requiredTodoItem);
    this.todoItems[editedTodoItem]=new TodoItem(editedTodoItem);
  }
  selectTodoItem(requiredTodoItem) {
    this.todoItems[requiredTodoItem].selectItem();
  }
  unselectTodoItem(requiredTodoItem) {
    this.todoItems[requiredTodoItem].unselectItem();
  }
  isSelectedTodoItem(requiredTodoItem) {
    return this.todoItems[requiredTodoItem].status;
  }
}

module.exports=Todo;
