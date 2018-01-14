let User=require('./user.js');
const sulagna=new User('sulagna');

const getNewTodo=function (title,description,todoItem) {
  sulagna.addTodo(title,description);
  sulagna.addTodoItemInList(title,todoItem);
};

const handleTodo=function (todoDetails) {
  let title=todoDetails.title.replace(/\+/g,' ');
  let description=todoDetails.description.replace(/\+/g,' ');
  let todoItem=todoDetails.item.replace(/\+/g,' ');
  getNewTodo(title,description,todoItem);
}

module.exports=handleTodo;
