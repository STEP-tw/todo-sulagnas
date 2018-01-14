const Todo=require('./todo.js');

class User {
  constructor(userName) {
    this.userName=userName;
  }
  addTodo(title,description){
    this[title]=new Todo(title,description);
  }
  addTodoItemInList(titleOfTodo,newTodoItem) {
    this[titleOfTodo].addTodoItem(newTodoItem);
  }
  deleteTodoItemInList(titleOfTodo,requiredTodoItem) {
    this[titleOfTodo].deleteTodoItem(requiredTodoItem);
  }
  editTodoItemInList(titleOfTodo,oldTodoItem,newTodoItem) {
    this[titleOfTodo].editTodoItem(oldTodoItem,newTodoItem);
  }
  selectTodoItemInList(titleOfTodo,requiredTodoItem) {
    this[titleOfTodo].selectTodoItem(requiredTodoItem);
  }
  unselectTodoItemInList(titleOfTodo,requiredTodoItem) {
    this[titleOfTodo].unselectTodoItem(requiredTodoItem);
  }
  isSelectedTodoItemInList(titleOfTodo,requiredTodoItem) {
    return this[titleOfTodo].isSelectedTodoItem(requiredTodoItem);
  }
}
module.exports=User;
