class Todo {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.todoItems={};
  }
  addTodoItem(newTodoItem) {
    this.todoItems[newTodoItem]=new TodoItem(newTodoItem);
  }
  editTodoItem(requiredTodoItem,editedTodoItem) {
    this.todoItems[requiredTodoItem]=new TodoItem(editedTodoItem);
  }
  deleteTodoItem(requiredTodoItem) {
    delete this.todoItems[requiredTodoItem];
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
