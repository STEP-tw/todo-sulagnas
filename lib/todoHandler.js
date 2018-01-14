let User=require('./user.js');

const getNewTodo=function (user,title,description,todoItem) {
  user.addTodo(title,description);
  user.addTodoItemInList(title,todoItem);
};

const handleTodo=function (user,todoDetails) {
  let title=todoDetails.title.replace(/\+/g,' ');
  let description=todoDetails.description.replace(/\+/g,' ');
  let todoItem=todoDetails.item.replace(/\+/g,' ');
  getNewTodo(user,title,description,todoItem);
}

exports.handleTodo=handleTodo;
