const TodoApp=require('../models/todoApp.js');
const User=require('../models/user.js');
let fs=require('fs');
let todoApp=new TodoApp();
todoApp.addUser('sulagna');

const getUser=function () {
  return todoApp.getUser(0);
};

const getTodosOf=function (sulagna) {
  let todoList=[];
  todoList.push(sulagna);
  let todos=JSON.stringify(todoList,null,2);
  return todos.replace(/\+/g,' ');
};

const storeTodoOf=function (sulagna) {
  let todosOf=getTodosOf(sulagna);
  fs.writeFileSync('./data/todo.json',todosOf);
  fs.writeFileSync('./public/js/todoStore.js',`let todoList=${todosOf}`);
};

const makeNewTodo=function (title,description) {
  let sulagna=getUser();
  sulagna.addTodo(title,description);
  storeTodoOf(sulagna);
};

exports.makeNewTodo=makeNewTodo;
