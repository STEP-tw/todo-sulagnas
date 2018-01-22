class ViewTodoHandler {
  constructor(fs) {
    this.fs=fs || require('fs');
  }
  execute(req,res){
    let viewTodoTemplate = this.fs.readFileSync('./templates/viewTodo.html','utf8');
    let todoId=req.body.todoId;
    let todo=req.user.getTodo(todoId);
    if(!todo){
      res.write('file not found');
      res.end();
    }
    let actualTodo = viewTodoTemplate.replace('todoId',todo.title);
    actualTodo = actualTodo.replace('viewTodo',todo.toHtml());
    res.write(actualTodo);
    res.end();
  }
};

module.exports=ViewTodoHandler;
