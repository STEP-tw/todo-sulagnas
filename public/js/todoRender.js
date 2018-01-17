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
    showDetail.appendChild(title);
    showTodo.appendChild(line);
  })
};

const showTodoDetail=function () {
  let description=document.getElementById('description');
  alert('hello')
};

window.onload=showTodos;
