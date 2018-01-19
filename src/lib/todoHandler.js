const TodoApp=require('../models/todoApp.js');
const User=require('../models/user.js');
let fs=require('fs');
let todoApp=new TodoApp();
todoApp.addUser('sulagna');
let sulagna=todoApp.getUser('sulagna');

const getTodosOf=function (sulagna) {
  let todoList=[];
  todoList.push(sulagna);
  let todos=JSON.stringify(todoList,null,2);
  return todos;
};

const storeTodoOf=function (sulagna) {
  let todosOf=getTodosOf(sulagna);
  fs.writeFileSync('./data/todo.json',todosOf);
  fs.writeFileSync('./public/js/todoStore.js',`let todoList=${todosOf}`);
};

const makeNewTodo=function (title,description) {
  sulagna.addTodo(title,description);
  storeTodoOf(sulagna);
};

const addNewTodoItem=function (id,item) {
  console.log(sulagna);
  item = item.replace(/\+/g,' ')
  sulagna.addTodoItem(id,item);
  storeTodoOf(sulagna);
};
exports.addNewTodoItem=addNewTodoItem;
exports.makeNewTodo=makeNewTodo;
