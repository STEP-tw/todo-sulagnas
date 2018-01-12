const fs=require('fs');

const storeInTodoStorage=function (todoStoragePath,todoInPublicPath,newTodo) {
  fs.readFile(todoStoragePath,(err,content)=>{
    let todoList=JSON.parse(content);
    todoList.unshift(newTodo);
    writeInTodoStorage(todoStoragePath,todoList);
    writeInPublicStorage(todoInPublicPath,todoList);
  });
};

const getTodoContent=function (todoDetails) {
  let todoContentStr=JSON.stringify(todoDetails).replace(/\+/g,' ');
  let moreThanOneItem=todoContentStr.replace(/%0D%0A/g,'","item":"')
  return JSON.parse(moreThanOneItem);
};

const storeNewTodo=function (todoDetails) {
  let todoContent=getTodoContent(todoDetails);
  const todoStoragePath='./data/todo.json';
  const todoInPublicPath='./public/js/todoStore.js'
  storeInTodoStorage(todoStoragePath,todoInPublicPath,todoContent);
};

const writeInTodoStorage=function (todoStoragePath,todoList) {
  let todoToStore=JSON.stringify(todoList,null,2);
  fs.writeFile(todoStoragePath,todoToStore,()=>{});
};

const writeInPublicStorage=function (todoInPublicPath,todoList) {
  let todoToStore='let todoList='+JSON.stringify(todoList,null,2);
  fs.writeFile(todoInPublicPath,todoToStore,()=>{});
};

exports.storeNewTodo=storeNewTodo;
