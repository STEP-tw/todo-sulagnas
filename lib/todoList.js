const Todo=require('./todo.js');

class TodoList {
  constructor() {
    this.todoList={};
  }
  addTodo(title,description){
    this.todoList[title]=new Todo(title,description);
  }
  editTitle(newTitle) {
    this.todo.title=newTitle;
  }
  editDescription(newDescription) {
    this.todo.description=newDescription;
  }
  addTodoItemInList(newTodoItem) {
    this.todo.addTodoItem(newTodoItem);
  }
  deleteTodoItemInList(requiredTodoItem) {
    this.todo.deleteTodoItem(requiredTodoItem);
  }
  editTodoItemInList(oldTodoItem,newTodoItem) {
    this.todo.editTodoItem(oldTodoItem,newTodoItem);
  }
  selectTodoItemInList(requiredTodoItem) {
    this.todo.selectTodoItem(requiredTodoItem);
  }
  unselectTodoItemInList(requiredTodoItem) {
    this.todo.unselectTodoItem(requiredTodoItem);
  }
  isSelectedTodoItemInList(requiredTodoItem) {
    return this.todo.isSelectedTodoItem(requiredTodoItem);
  }
}
module.exports=TodoList;
