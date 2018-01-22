class ViewTodoHandler {
  constructor(fs) {
    this.fs=fs || require('fs');
  }
  execute(req,res){
    let viewTodoTemplate = this.fs.readFileSync('./templates/viewTodo.html','utf8');
    let todoId=req.body.todoId;
    let todo=req.user.getTodo(todoId);
    if(!todo){
      res.statusCode = 404;
      res.write('file not found');
      res.end();
      return;
    }
    let actualTodo = viewTodoTemplate.replace('todoId',todo.title);
    actualTodo = actualTodo.replace('viewTodo',todo.toHtml());
    res.setHeader('Content-type',"text/html");
    res.statusCode = 200;
    res.write(actualTodo);
    res.end();
  }
};

module.exports=ViewTodoHandler;
