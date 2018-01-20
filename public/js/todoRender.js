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

    let editButton=document.createElement('button');
    editButton.innerText='edit';
    item.appendChild(editButton);
    editButton.onclick=function () {showEditOption(todo,eachItem,editButton)}
    let deleteButton=document.createElement('button');
    deleteButton.innerText='delete';
    item.appendChild(deleteButton);
  })
  let addItemForm=document.createElement('form');
  addItemForm.method='POST';
  title.appendChild(addItemForm);

  let itemBox=document.createElement('input');
  itemBox.type='text';
  itemBox.name='itemForAdd';
  addItemForm.appendChild(itemBox);

  let todoId=document.createElement('input');
  todoId.style.visibility='hidden';
  todoId.name='todoId';
  addItemForm.appendChild(todoId);

  let addItemButton=document.createElement('input');
  addItemButton.type='submit';
  addItemButton.value='add todo item';

  addItemButton.onclick=function(){sendTodoId(todo,todoId)};
  addItemForm.appendChild(addItemButton);
};

const sendTodoId=function (todo,todoId) {
  todoId.value=todo.title;
};

const sendIdForEdit=function (todo,item,todoIdToEdit,editIdToEdit) {
  todoIdToEdit.value=todo.title;
  editIdToEdit.value=item.item;
};

const showEditOption=function (todo,eachItem,editButton) {
  let editItemForm=document.createElement('form');
  editItemForm.method='POST';
  editButton.appendChild(editItemForm);

  let todoIdToEdit=document.createElement('input');
  todoIdToEdit.style.visibility='hidden';
  todoIdToEdit.name='todoIdToEdit';
  editItemForm.appendChild(todoIdToEdit);

  let editIdToEdit=document.createElement('input');
  editIdToEdit.style.visibility='hidden';
  editIdToEdit.name='editIdToEdit';
  editItemForm.appendChild(editIdToEdit);

  let editedItemBox=document.createElement('input');
  editedItemBox.type='text';
  editedItemBox.name='itemForEdit';
  editItemForm.appendChild(editedItemBox);

  let editSubmitButton=document.createElement('input');
  editSubmitButton.type='submit';
  editSubmitButton.value='submit new todo';
  editItemForm.appendChild(editSubmitButton);

  editSubmitButton.onclick=function(){sendIdForEdit(todo,eachItem,todoIdToEdit,editIdToEdit)}
}

window.onload=showTodos;
