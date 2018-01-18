const Todo=require('./todo.js');

class User {
  constructor(id,userName) {
    this.id=id;
    this.userName=userName;
    this.todos=[];
    this.todoCount=0;
  }
  getId(){
    return this.id;
  }
  getUserName(){
    return this.userName;
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
  getTodo(todoId) {
    let todoIndex=this.getTodoIndex(todoId);
    return this.todos[todoIndex];
  }
  getTitle(todoId) {
    return this.todos[todoId].getTitle();
  }
  getDescription(todoId) {
    return this.todos[todoId].getDescription();
  }
  editTitle(todoId,newTitle) {
    this.todos[todoId].title=newTitle;
  }
  editDescription(todoId,newDescription) {
    this.todos[todoId].description=newDescription;
  }
  deleteTodo(todoId) {
    let todoIndex=this.getTodoIndex(todoId);
    delete this.todos.splice(todoIndex,1);
  }
  addTodoItem(todoId,newTodoItem) {
    let todoIndex=this.getTodoIndex(todoId);
    console.log(todoId);
    console.log(todoIndex);
    this.todos[todoIndex].addTodoItem(newTodoItem);
  }
  getTodoItem(todoId,itemId) {
    let todoIndex=this.getTodoIndex(todoId);
    return this.todos[todoIndex].getTodoItem(itemId);
  }
  deleteTodoItem(todoId,itemId) {
    let todoIndex=this.getTodoIndex(todoId);
    this.todos[todoIndex].deleteTodoItem(itemId);
  }
  editTodoItem(todoId,itemId,editedTodoItem) {
    let todoIndex=this.getTodoIndex(todoId);
    this.todos[todoIndex].editTodoItem(itemId,editedTodoItem);
  }
  markAsDone(todoId,itemId) {
    let todoIndex=this.getTodoIndex(todoId);
    this.todos[todoIndex].markAsDone(itemId);
  }
  markAsUndone(todoId,itemId) {
    let todoIndex=this.getTodoIndex(todoId);
    this.todos[todoIndex].markAsUndone(itemId);
  }
  isDone(todoId,itemId) {
    let todoIndex=this.getTodoIndex(todoId);
    return this.todos[todoIndex].isDone(itemId);
  }
}
module.exports=User;
