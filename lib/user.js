const Todo=require('./todo.js');

class User {
  constructor(userName) {
    this.todoList={};
  }
  addTodo(title,description){
    this.todoList[title]=new Todo(title,description);
  }
  editTitleOfATodo(titleOfTodo,newTitle) {
    this.todoList[titleOfTodo].title=newTitle;
  }
  editDescriptionOfATodo(descriptionOfTodo,newDescription) {
    this.todoList[descriptionOfTodo].description=newDescription;
  }
  addTodoItemInList(titleOfTodo,newTodoItem) {
    this.todoList[titleOfTodo].addTodoItem(newTodoItem);
  }
  deleteTodoItemInList(titleOfTodo,requiredTodoItem) {
    this.todoList[titleOfTodo].deleteTodoItem(requiredTodoItem);
  }
  editTodoItemInList(titleOfTodo,oldTodoItem,newTodoItem) {
    this.todoList[titleOfTodo].editTodoItem(oldTodoItem,newTodoItem);
  }
  selectTodoItemInList(titleOfTodo,requiredTodoItem) {
    this.todoList[titleOfTodo].selectTodoItem(requiredTodoItem);
  }
  unselectTodoItemInList(titleOfTodo,requiredTodoItem) {
    this.todoList[titleOfTodo].unselectTodoItem(requiredTodoItem);
  }
  isSelectedTodoItemInList(titleOfTodo,requiredTodoItem) {
    return this.todoList[titleOfTodo].isSelectedTodoItem(requiredTodoItem);
  }
}
module.exports=User;
