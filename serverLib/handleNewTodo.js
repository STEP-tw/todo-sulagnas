const fs=require('fs');

const storeInTodoStorage=function (todoStoragePath,todoInPublicPath,newTodo) {
  fs.readFile(todoStoragePath,(err,content)=>{
    let todoList=JSON.parse(content);
    todoList.unshift(newTodo);
    writeInTodoStorage(todoStoragePath,todoList);
    writeInPublicStorage(todoInPublicPath,todoList);
  });
};

const storeNewTodo=function (todoDetails,userName) {
  //todoDetails.userName=userName;
  const todoStoragePath='./data/todo.json';
  const todoInPublicPath='./public/js/todoStore.js'
  storeInTodoStorage(todoStoragePath,todoInPublicPath,todoDetails);
};

const writeInTodoStorage=function (todoStoragePath,todoList) {
  let todoToStore=JSON.stringify(todoList,null,2);
  fs.writeFile(todoStoragePath,todoToStore,()=>{});
};

const writeInPublicStorage=function (todoInPublicPath,todoList) {
  let todoToStore='let todoList='+JSON.stringify(todoList,null,2);
  fs.writeFile(todoInPublicPath,todoToStore,()=>{});
};

const redirectToPage=function (res,location){
  const redirectLocation={'Location':location};
  res.writeHead(302,redirectLocation);
  res.end();
};

exports.storeNewTodo=storeNewTodo;
