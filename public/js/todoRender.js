const showTodos=function () {
  let showTodo=document.getElementById('showTodo');
  let todoKeys=Object.keys(todoList[0]);
  todoList.forEach(function (todo,index) {
    let title=document.createElement('p');
    let boldTitle=document.createElement('b');
    let line=document.createElement('hr');
    boldTitle.innerText=todo[todoKeys[index]].title;
    title.appendChild(boldTitle);
    showTodo.appendChild(title);
    showTodo.appendChild(line);
  })
};

const showTodoDetail=function () {
  let description=document.getElementById('description');
};

window.onload=showTodos;
