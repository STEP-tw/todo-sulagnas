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
  getIndexOfTodo(id) {
    return this.todos.findIndex(todo=>todo.id==id);
  }
  addTodoItemOfTodo(todoId,newTodoItem) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    this.todos[indexOfTodo].addTodoItem(newTodoItem);
  }
  deleteTodoItemOfTodo(todoId,itemId) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    this.todos[indexOfTodo].deleteTodoItem(itemId);
  }
  editTodoItemOfTodo(todoId,itemId,editedTodoItem) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    this.todos[indexOfTodo].editTodoItem(itemId,editedTodoItem);
  }
  doneTodoItemOfTodo(todoId,itemId) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    this.todos[indexOfTodo].doneTodoItem(itemId);
  }
  undoneTodoItemOfTodo(todoId,itemId) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    this.todos[indexOfTodo].undoneTodoItem(itemId);
  }
  isDoneTodoItemOfTodo(todoId,itemId) {
    let indexOfTodo=this.getIndexOfTodo(todoId);
    return this.todos[indexOfTodo].isDoneTodoItem(itemId);
  }
}
module.exports=User;
