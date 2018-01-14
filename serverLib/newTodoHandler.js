let fs=require('fs');
let User=require('../lib/user.js');
const sulagna=new User('sulagna');
const getTodoObj=require('../lib/todoHandler.js').handleTodo;

const getTodoList=function (user) {
  let todoList=[];
  todoList.push(user);
  delete todoList[0].userName;
  return todoList;
};

const storeNewTodo=function (user) {
  let storagePath='./public/js/todoStore.js';
  let todoList=getTodoList(sulagna);
  let todos=JSON.stringify(todoList,null,2);
  fs.writeFileSync(storagePath,`let todoList=${todos}`);
};

const redirectToViewTodo=function (res) {
  res.redirect('./viewTodo.html')
};

const handleNewTodo=function (req,res) {
  getTodoObj(sulagna,req.body);
  storeNewTodo(sulagna);
  redirectToViewTodo(res);
};

exports.handleNewTodo=handleNewTodo;
