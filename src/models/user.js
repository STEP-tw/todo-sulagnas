const Todo=require('./todo.js');

class User {
  constructor(id,userName) {
    this.id=id;
    this.userName=userName;
    this.todos=[];
    this.todoCount=0;
  }
  getCurrentTodoId() {
    return this.todoCount++;
  }
  addTodo(title,description){
    let currentTodoId=this.getCurrentTodoId();
    let newTodo=new Todo(currentTodoId,title,description);
    this.todos.push(newTodo);
  }
  getTodoIndex(id) {
    return this.todos.findIndex(todo=>todo.id==id);
  }
  addTodoItem(todoId,newTodoItem) {
    let indexOfTodo=this.getTodoIndex(todoId);
    this.todos[indexOfTodo].addTodoItem(newTodoItem);
  }
  deleteTodoItem(todoId,itemId) {
    let indexOfTodo=this.getTodoIndex(todoId);
    this.todos[indexOfTodo].deleteTodoItem(itemId);
  }
  editTodoItem(todoId,itemId,editedTodoItem) {
    let indexOfTodo=this.getTodoIndex(todoId);
    this.todos[indexOfTodo].editTodoItem(itemId,editedTodoItem);
  }
  markAsDone(todoId,itemId) {
    let indexOfTodo=this.getTodoIndex(todoId);
    this.todos[indexOfTodo].markAsDone(itemId);
  }
  markAsUndone(todoId,itemId) {
    let indexOfTodo=this.getTodoIndex(todoId);
    this.todos[indexOfTodo].markAsUndone(itemId);
  }
  isDone(todoId,itemId) {
    let indexOfTodo=this.getTodoIndex(todoId);
    return this.todos[indexOfTodo].isDone(itemId);
  }
}
module.exports=User;
