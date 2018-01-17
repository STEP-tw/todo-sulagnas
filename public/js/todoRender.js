const showTodos=function () {
  let showTodo=document.getElementById('showTodo');
  let showUserName=document.getElementById('showUserName');
  let showDetail=document.getElementById('showDetail');
  todoList.forEach(function (todo) {
    let userName=document.createElement('h2');
    userName.innerText=`hello...you are logged in as ${todo.userName}`;
    showUserName.appendChild(userName);
    let title=document.createElement('h3');
    let line=document.createElement('hr');
    title.innerText=todo.todos[0].title;
    title.onclick=function(){showTodoDetail(todo)};
    showDetail.appendChild(title);
    showTodo.appendChild(line);
  })
};

const showTodoDetail=function (todo) {
  let showDescription=document.getElementById('showDescription');
  let description=document.createElement('h4');
  description.innerText=todo.todos[0].description;
  showDescription.appendChild(description);
  let todoItem=document.getElementById('TodoItem');
  let todoItems=todo.todos[0].todoItems;
  todoItems.forEach(function (eachItem) {
    let item=document.createElement('p');
    item.innerText=eachItem.item;
    todoItem.appendChild(item);
  })
};

window.onload=showTodos;
