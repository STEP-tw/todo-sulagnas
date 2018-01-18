const showTodos=function () {
  let showTodo=document.getElementById('showTodo');
  let showUserName=document.createElement('h2');
  let showTitleHeading=document.createElement('h3');
  let showDetail=document.createElement('div');
  todoList.forEach(function (user) {
    showUserName.innerText=`hello...you are logged in as ${user.userName}`;
    showTitleHeading.innerText='To view your todo completely click on the todo title...\nyour todos are :-';
    user.todos.forEach(function (todo,index) {
      let title=document.createElement('h3');
      title.innerText=`${index+1}. ${todo.title}`;
      showDetail.appendChild(title);
      title.onclick=function(){showTodoDetail(todo,index,showDetail)};
    })
    showTodo.appendChild(showUserName);
    showTodo.appendChild(showTitleHeading);
    showTodo.appendChild(showDetail);
  })
};

const showTodoDetail=function (todo,index,title) {
  let description=document.createElement('h4');
  description.innerText=`description of '${todo.title}' is :-\n${todo.description}`;
  title.appendChild(description);
  let todoItems=todo.todoItems;
  todoItems.forEach(function (eachItem,index) {
    let item=document.createElement('p');
    item.innerText=`${index+1}.${eachItem.item}`;
    title.appendChild(item);
  })
};

window.onload=showTodos;
